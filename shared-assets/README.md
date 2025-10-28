# Shared Assets

This directory contains common assets used across all three implementations of the ticket management system.

## Contents

### CSS (`/css`)

- **`common.css`** - Common styles used across all implementations
  - CSS variables for consistent theming
  - Base styles for typography, buttons, forms, cards
  - Hero section with wavy background
  - Decorative elements (circles)
  - Status badges with consistent colors
  - Toast notifications
  - Responsive utilities

### JavaScript (`/js`)

- **`utils.js`** - Common utility functions used across all implementations
  - **AuthUtils** - Authentication utilities
    - Session management using localStorage
    - Mock authentication and signup functions
    - Route protection
  - **ToastUtils** - Toast notification system
    - Success, error, and warning notifications
    - Auto-dismiss functionality
  - **ValidationUtils** - Form validation helpers
    - Email, required field, length validation
    - Error display and clearing
  - **ApiUtils** - Mock API utilities
    - Ticket CRUD operations
    - Statistics calculation
  - **DateUtils** - Date formatting utilities
    - Standard and relative time formatting

### Images (`/images`)

This directory is intended for shared images, icons, and other visual assets.

## Usage

Each implementation should import or reference these shared assets to maintain consistency in design and functionality.

### React Implementation

```javascript
import '../shared-assets/css/common.css';
import { AuthUtils, ToastUtils, ValidationUtils, ApiUtils, DateUtils } from '../shared-assets/js/utils';
```

### Vue.js Implementation

```javascript
import '../shared-assets/css/common.css';
import { AuthUtils, ToastUtils, ValidationUtils, ApiUtils, DateUtils } from '../shared-assets/js/utils';
```

### Twig Implementation

```html
<link rel="stylesheet" href="/shared-assets/css/common.css">
<script src="/shared-assets/js/utils.js"></script>
```

## Design System

### Color Palette

- **Primary**: `#4f46e5` (Indigo)
- **Success**: `#22c55e` (Green) - Used for "Open" status
- **Warning**: `#f59e0b` (Amber) - Used for "In Progress" status
- **Gray**: `#6b7280` - Used for "Closed" status
- **Light Gray**: `#f3f4f6` (Backgrounds)
- **White**: `#ffffff`

### Typography

- **Font Family**: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
- **Font Weights**: 400 (Regular), 500 (Medium), 700 (Bold)
- **Line Height**: 1.6 (body), 1.2 (headings)

### Spacing

- **Border Radius**: `0.5rem` (8px)
- **Padding**: Consistent spacing scale from `0.25rem` to `1.5rem`
- **Margin**: Consistent spacing scale from `0.25rem` to `3rem`

### Shadows

- **Small**: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- **Medium**: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
- **Large**: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`

### Breakpoints

- **Mobile**: `< 576px`
- **Tablet**: `≥ 576px` and `< 768px`
- **Desktop**: `≥ 768px`
- **Max Width**: `1440px` (centered on larger screens)

## Components

### Buttons

- **Primary**: Solid button with primary color
- **Secondary**: Light gray button
- **Success**: Solid button with success color
- **Warning**: Solid button with warning color
- **Danger**: Solid button with danger color
- **Sizes**: Small, Regular, Large

### Forms

- **Form Group**: Container for form labels and controls
- **Form Label**: Styled label for form inputs
- **Form Control**: Styled input, select, textarea
- **Validation**: Error states and messages

### Cards

- **Card**: Container with shadow and rounded corners
- **Card Body**: Content area
- **Card Header**: Header section
- **Card Footer**: Footer section

### Status Badges

- **Success**: Green badge for "Open" status
- **Warning**: Amber badge for "In Progress" status
- **Gray**: Gray badge for "Closed" status

### Toast Notifications

- **Container**: Fixed position in top-right corner
- **Toast**: Card with colored left border
- **Auto-dismiss**: After 5 seconds by default
- **Close Button**: Manual dismiss option

## Responsive Design

All styles are designed to be responsive across mobile, tablet, and desktop devices. The layout adapts using:

- Fluid containers with max-width
- Responsive typography
- Flexible grid systems
- Media queries for different breakpoints