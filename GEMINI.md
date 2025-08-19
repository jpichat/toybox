# Gemini's Guide to Contributing to TOYBOX

This document outlines best practices for me, Gemini, when assisting with development in the TOYBOX project.

## Core Principles

1.  **Artifact Encapsulation:** All code, components, and dependencies for a specific artifact must be contained within that artifact's directory structure at `src/artifacts/<artifact-name>/`. The goal is for each artifact to be a self-contained unit.

2.  **No Core Component Modification:** The shared UI components located in `src/components/ui/` and other directories under `src/components/` are considered off-limits for modification when addressing an artifact-specific requirement. These are general-purpose, foundational components and should not be altered to fit the specific needs of a single artifact.

3.  **Direct Dependency Imports:** When an artifact requires functionality from a third-party library (e.g., `recharts`), it should import it directly from the package. Do not attempt to route imports through a shared component if that component does not explicitly and intentionally export the required functionality.

## Example Scenario: Charting Components

-   **Problem:** An artifact's chart component (e.g., `ExpenseBreakdownChart.tsx`) fails because it tries to import a specific primitive like `YAxis` from the shared `src/components/ui/chart.tsx` component, which does not export it.

-   **Incorrect Solution:** Modifying `src/components/ui/chart.tsx` to export `YAxis` and other primitives.

-   **Correct Solution:** Modifying the artifact's component (`ExpenseBreakdownChart.tsx`) to import `YAxis` directly from the `recharts` library, like so:
    ```typescript
    import { YAxis } from 'recharts';
    ```
