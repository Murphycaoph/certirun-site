import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const publicImagesDir = path.join(rootDir, "public", "images");
const srcDir = path.join(rootDir, "src");
const reportPath = path.join(rootDir, "docs", "image-optimization-report.json");
const dimensionsPath = path.join(srcDir, "lib", "generatedImageDimensions.ts");

const SOURCE_IMAGE_RE = /\.(png|jpe?g)$/i;
const SOURCE_REF_RE = /\/images\/[^"'()\s<>]+?\.(?:png|jpe?g)/gi;
const CODE_FILE_RE = /\.(astro|css|js|jsx|ts|tsx)$/i;

const profiles = {
  hero: { maxWidth: 1200, quality: 82 },
  card: { maxWidth: 640, quality: 80 },
  brand: { maxWidth: 480, quality: 82 },
  default: { maxWidth: 1200, quality: 80 },
};

const toPosix = (value) => value.split(path.sep).join("/");

const toSharpPath = (value) => {
  if (process.platform !== "win32") {
    return value;
  }

  const resolved = path.resolve(value);
  return resolved.startsWith("\\\\?\\") ? resolved : `\\\\?\\${resolved}`;
};

const classifyImage = (relativePath) => {
  const normalized = toPosix(relativePath).toLowerCase();
  const filename = path.basename(normalized);

  if (
    normalized.includes("/page-heroes/") ||
    normalized.includes("/industries/hero-") ||
    filename.startsWith("hero-") ||
    filename.includes("-hero")
  ) {
    return "hero";
  }

  if (normalized.includes("/brand/") || filename.includes("logo")) {
    return "brand";
  }

  if (
    normalized.includes("/scope/") ||
    normalized.includes("/cases/") ||
    normalized.includes("/testimonials/") ||
    normalized.includes("/brands/") ||
    normalized.includes("/platform-library/") ||
    normalized.includes("/platform-fallbacks/")
  ) {
    return "card";
  }

  return "default";
};

const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return walk(fullPath);
      }

      return [fullPath];
    }),
  );

  return files.flat();
};

const optimizeImages = async () => {
  const files = (await walk(publicImagesDir)).filter((file) => SOURCE_IMAGE_RE.test(file));
  const results = [];
  const dimensions = {};

  for (const sourcePath of files) {
    const relativePath = path.relative(publicImagesDir, sourcePath);
    const publicPath = `/images/${toPosix(relativePath).replace(SOURCE_IMAGE_RE, ".webp")}`;
    const outputPath = sourcePath.replace(SOURCE_IMAGE_RE, ".webp");
    const usage = classifyImage(relativePath);
    const profile = profiles[usage];
    const sourceStat = await fs.stat(sourcePath);
    const sourceMeta = await sharp(toSharpPath(sourcePath)).metadata();
    const resizeWidth =
      sourceMeta.width && sourceMeta.width > profile.maxWidth ? profile.maxWidth : undefined;

    await sharp(toSharpPath(sourcePath))
      .rotate()
      .resize({
        width: resizeWidth,
        withoutEnlargement: true,
      })
      .webp({
        quality: profile.quality,
        effort: 5,
      })
      .toFile(toSharpPath(outputPath));

    const outputStat = await fs.stat(outputPath);
    const outputMeta = await sharp(toSharpPath(outputPath)).metadata();

    dimensions[publicPath] = {
      width: outputMeta.width,
      height: outputMeta.height,
    };

    results.push({
      source: `/images/${toPosix(relativePath)}`,
      output: publicPath,
      usage,
      sourceBytes: sourceStat.size,
      outputBytes: outputStat.size,
      sourceWidth: sourceMeta.width,
      sourceHeight: sourceMeta.height,
      outputWidth: outputMeta.width,
      outputHeight: outputMeta.height,
    });
  }

  return { results, dimensions };
};

const pruneSourceImages = async (results) => {
  const removed = [];

  for (const result of results) {
    const sourcePath = path.join(rootDir, "public", result.source.replace(/^\//, ""));
    const outputPath = path.join(rootDir, "public", result.output.replace(/^\//, ""));

    try {
      await fs.access(outputPath);
      await fs.unlink(sourcePath);
      removed.push(result.source);
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }
  }

  return removed;
};

const updateSourceReferences = async () => {
  const files = (await walk(srcDir)).filter((file) => CODE_FILE_RE.test(file));
  const changed = [];

  for (const file of files) {
    const original = await fs.readFile(file, "utf8");
    const updated = original.replace(SOURCE_REF_RE, (match) =>
      match.replace(SOURCE_IMAGE_RE, ".webp"),
    );

    if (updated !== original) {
      await fs.writeFile(file, updated);
      changed.push(path.relative(rootDir, file));
    }
  }

  return changed;
};

const writeDimensionsFile = async (dimensions) => {
  const entries = Object.entries(dimensions).sort(([a], [b]) => a.localeCompare(b));
  const body = entries
    .map(([src, size]) => `  ${JSON.stringify(src)}: { width: ${size.width}, height: ${size.height} },`)
    .join("\n");

  await fs.writeFile(
    dimensionsPath,
    `export type GeneratedImageDimensions = {\n  width: number;\n  height: number;\n};\n\nexport const GENERATED_IMAGE_DIMENSIONS: Record<string, GeneratedImageDimensions> = {\n${body}\n};\n`,
  );
};

const formatBytes = (value) => `${(value / 1024 / 1024).toFixed(2)} MB`;

const main = async () => {
  const shouldUpdateRefs = process.argv.includes("--update-refs");
  const shouldPruneSourceImages = process.argv.includes("--prune-source-images");
  const { results, dimensions } = await optimizeImages();
  const changedSourceFiles = shouldUpdateRefs ? await updateSourceReferences() : [];
  const removedSourceImages = shouldPruneSourceImages ? await pruneSourceImages(results) : [];

  const sourceBytes = results.reduce((sum, item) => sum + item.sourceBytes, 0);
  const outputBytes = results.reduce((sum, item) => sum + item.outputBytes, 0);
  const oversizedOutputs = results.filter((item) => item.outputWidth > 1200);

  await writeDimensionsFile(dimensions);
  await fs.writeFile(
    reportPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        sourceCount: results.length,
        sourceBytes,
        outputBytes,
        savedBytes: sourceBytes - outputBytes,
        oversizedOutputs,
        changedSourceFiles,
        removedSourceImages,
        images: results,
      },
      null,
      2,
    ),
  );

  console.log(`Optimized ${results.length} images.`);
  console.log(`Original total: ${formatBytes(sourceBytes)}`);
  console.log(`WebP total: ${formatBytes(outputBytes)}`);
  console.log(`Saved: ${formatBytes(sourceBytes - outputBytes)}`);
  console.log(`Source files updated: ${changedSourceFiles.length}`);
  console.log(`Source images removed: ${removedSourceImages.length}`);

  if (oversizedOutputs.length > 0) {
    console.error(`Found ${oversizedOutputs.length} outputs wider than 1200px.`);
    process.exitCode = 1;
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
