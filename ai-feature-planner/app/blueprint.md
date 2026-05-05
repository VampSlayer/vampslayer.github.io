# FeatureForge Blueprint

## Project Overview
**FeatureForge** is an AI-powered engineering documentation wizard. It helps product managers and developers break down high-level feature ideas into structured, actionable items: User Stories, Engineering Tasks, Acceptance Criteria, and Test Cases.

## Tech Stack
*   **Framework**: React 19 + Vite
*   **Language**: TypeScript
*   **Styling**: Vanilla CSS with custom properties (CSS variables) for modern, dynamic theming (Glassmorphism, Dark Mode).
*   **AI Integration**: `@google/generative-ai` (Gemini API)
*   **Icons**: `lucide-react`

## Core Architecture
The application is built around a state machine that progresses through a defined sequence of steps.

*   **`src/App.tsx`**: The main orchestrator. It holds the global state (`idea`, `stories`, `tasks`, `acs`, `tests`) and tracks the current wizard step.
*   **`src/services/ai.ts`**: Contains the prompt engineering and API calls to Gemini. It breaks down generation into distinct, contextual steps: `generateUserStories`, `generateTasks`, `generateAcceptanceCriteria`, and `generateTestCases`.
*   **`src/services/export.ts`**: Utilities to convert the generated JSON arrays into GitHub-flavored Markdown or Jira-compatible CSV formats.

### Key Components
*   **`FeatureInput.tsx`**: The landing state where the user provides their initial idea.
*   **`WizardStepper.tsx`**: The visual progress indicator tracking the user's journey.
*   **`ReviewStep.tsx`**: A reusable wrapper component used in every generation phase. It displays the AI output and provides controls to either "Approve & Continue" or "Regenerate" (with optional refinement prompts).
*   **`SettingsModal.tsx`**: Manages the user's Gemini API key and preferred model, persisting them safely to `localStorage` so no backend is required.

## Design Patterns & Workflows
1.  **Sequential Context**: Each AI generation step relies on the approved output of the previous step. (e.g., `generateTasks` requires the `stories` array generated in step 1).
2.  **Iterative Refinement**: Instead of forcing the user to edit the original idea, they can click "Regenerate" at any step and provide localized instructions (e.g., "Make the tasks more granular").
3.  **Local-First Security**: The application runs entirely client-side. The API key is stored only in the browser and sent directly to Google's API endpoints.

## Roadmap & Future Features
If you're picking this project up later, here are some high-value features to implement next:

*   [ ] **Inline Editing**: Currently, users rely on the AI "Refinement" prompt to change outputs. Add the ability for users to manually click into the generated stories/tasks and edit the text directly before approving.
*   [ ] **Persistent Drafts**: Save the `App.tsx` state to `localStorage` or IndexedDB on every change so a browser refresh doesn't wipe out a user's progress mid-wizard.
*   [ ] **API Integrations**: Replace the static Markdown/CSV downloads with OAuth integrations to automatically create GitHub Issues or Jira Epics directly from the app.
*   [ ] **Custom System Prompts**: Add a tab in the Settings modal where power users can tweak the underlying AI prompts (e.g., to enforce a specific coding standard or architectural pattern when generating tasks).
*   [ ] **Drag & Drop Reordering**: Allow users to reorder or group tasks before exporting.
