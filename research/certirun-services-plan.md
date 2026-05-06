# CertiRun Services Plan

## Current Route

The Services navigation currently points to `/capabilities`. Phase one should treat `/capabilities` as the Services landing page unless a redirect or route rename is intentionally implemented later.

## Reframed Service Paths

### 1. Supplier Search & Comparison

Buyer intent: "I need suitable suppliers and comparable replies."

Outputs:

- requirement brief
- supplier shortlist
- comparison table
- response-quality notes

### 2. Verification Checkpoints

Buyer intent: "I need to reduce uncertainty before payment, samples, or shipment."

Outputs:

- product photo checks
- sample or pre-shipment checkpoints
- certificate/document review notes
- buyer-confirm-required flags

### 3. Order Coordination

Buyer intent: "I need someone to keep order details from getting lost."

Outputs:

- confirmed order detail summary
- label and packing notes
- supplier communication record
- issue follow-up list

### 4. Delivery & Document Follow-Up

Buyer intent: "I need delivery, documents, and handover steps to stay visible."

Outputs:

- packing checklist
- dispatch update log
- document handover checklist
- shipment milestone summary

## Cross-Cutting Capabilities

Document Control and Execution Visibility should appear across all four paths rather than as isolated equal-level services.

## Page CTA

Every service block should end with a route to structured RFQ/contact:

```text
Start a sourcing request -> /contact
```
