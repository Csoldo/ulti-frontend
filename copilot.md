## Copilot instructions

- The application is mobile-only. The design should be neat, minimalistic and to-the-point.
- Every UI facing text should be in hungarian, but the code is english
- Every component with styling should have its separate myComponent.module.css with its styles
- Do not use comments in the code
- Do not run terminal commands, rather just write what should be ran

## Application Structure

### Authentication Flow

- Login and Register pages with form validation
- Redirect to dashboard after successful login

### Main Application (Post-Login)

- **Tabbar Navigation** with 3 tabs:
  1. **Home** (`/home`) - Main page with "Start New Game" button
  2. **History** (`/history`) - Game history summary (empty for now)
  3. **Profile** (`/profile`) - User settings and info (empty for now)

### Game Flow

- Start new game button opens fullscreen modal
- **Game Settings Modal** - Player selection:
  - Select existing players from multiselect dropdown
  - Create new players (name only)
  - Players are associated with user account
  - Modal fills whole screen for mobile-first design
- **Game Screen** - Active game interface:
  - Players and their current scores
  - Current round counter
  - Brief summary of last round (if any)
  - Button to register new round
