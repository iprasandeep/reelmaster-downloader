# SCSS Structure Documentation

This directory contains the organized SCSS files for the Reelmaster application with a responsive, component-based architecture.

## File Structure

```
styles/
├── _variables.scss          # Design tokens and variables
├── _mixins.scss            # Reusable mixins and utilities
├── main.scss               # Main stylesheet that imports all components
└── components/             # Component-specific styles
    ├── _header.scss
    ├── _url-input.scss
    ├── _preview.scss
    ├── _steps.scss
    ├── _features.scss
    ├── _supported-platforms.scss
    ├── _faq.scss
    └── _footer.scss
```

## Design System

### Variables (`_variables.scss`)
- **Colors**: Primary, accent, secondary colors with semantic naming
- **Typography**: Font families, weights, and sizes
- **Spacing**: Consistent spacing scale (xs, sm, md, lg, xl, 2xl, 3xl)
- **Breakpoints**: Responsive breakpoints for mobile, tablet, and desktop
- **Shadows**: Box shadows and elevation system
- **Transitions**: Animation timing variables

### Mixins (`_mixins.scss`)
- **Responsive Mixins**: `@include mobile`, `@include tablet`, `@include desktop`
- **Layout Mixins**: `@include container`, `@include flex-center`, `@include grid-responsive`
- **Component Mixins**: `@include button-base`, `@include card-base`, `@include input-base`
- **Typography Mixins**: `@include heading-1`, `@include heading-2`, `@include heading-3`
- **Animation Mixins**: `@include fade-in-up`, `@include fade-in`

## Responsive Design

### Breakpoints
- **Mobile**: `max-width: 767px`
- **Tablet**: `768px - 1023px`
- **Desktop**: `min-width: 1024px`

### Mobile-First Approach
All styles are written mobile-first with progressive enhancement for larger screens.

### Grid System
- Uses CSS Grid with responsive columns
- Automatically adapts from 1 column (mobile) to 2-3 columns (desktop)
- Flexible gap spacing that adjusts per breakpoint

## Component Styles

### Header Component
- Responsive typography with fluid font sizes
- Gradient background integration
- Mobile-optimized spacing

### URL Input Component
- Flexible input field that adapts to screen size
- Loading states with spinner animation
- Error message styling
- Keyboard accessibility (Enter key support)

### Preview Component
- Card-based layout with hover effects
- Responsive image handling
- Download button styling with primary/secondary variants
- Success message styling

### Steps Component
- Numbered step indicators
- Connector lines between steps (hidden on mobile)
- Vertical layout on mobile, horizontal on desktop
- Hover animations and transitions

### Features Component
- Grid layout with responsive columns
- Highlight variant for featured items
- Icon integration with consistent sizing
- Hover effects with gradient overlays

### Supported Platforms Component
- Platform-specific gradient backgrounds
- Responsive grid (2 columns on mobile, 3 on desktop)
- Feature tags with consistent styling
- Platform badges and visual indicators

### FAQ Component
- Interactive accordion functionality
- Smooth animations for expand/collapse
- Staggered animation delays
- Mobile-optimized touch targets

### Footer Component
- Gradient background option
- Responsive link layout
- Social media integration ready
- Print-friendly styles

## Utility Classes

### Spacing Utilities
- `.mb-0` to `.mb-5` (margin-bottom)
- `.mt-0` to `.mt-5` (margin-top)
- `.p-0` to `.p-5` (padding)

### Responsive Utilities
- `.hidden-mobile` / `.visible-mobile`
- `.hidden-desktop` / `.visible-desktop`

### Text Utilities
- `.text-center`, `.text-left`, `.text-right`

## Animations

### Keyframe Animations
- `fadeInUp`: Slide up with fade in
- `fadeIn`: Simple fade in
- `slideInUp`: Enhanced slide up animation
- `pulse`: Loading state animation
- `loading`: Skeleton loading animation

### Transition Classes
- `.loading`: Disabled state with opacity
- `.skeleton`: Loading placeholder animation

## Accessibility Features

### Focus Management
- Consistent focus indicators
- Keyboard navigation support
- Screen reader friendly markup

### Color Contrast
- WCAG AA compliant color combinations
- High contrast mode considerations

## Performance Optimizations

### CSS Optimization
- Efficient selectors
- Minimal specificity conflicts
- Optimized animations (transform/opacity only)

### Mobile Performance
- Reduced animations on mobile
- Optimized touch targets (44px minimum)
- Efficient layout calculations

## Browser Support

### Modern Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Mobile Browsers
- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 14+

## Usage Examples

### Adding a New Component
1. Create component file in `components/` directory
2. Import variables and mixins
3. Use responsive mixins for breakpoints
4. Import in `main.scss`

### Customizing Colors
```scss
// In _variables.scss
$primary-color: #your-color;
$accent-color: #your-accent;
```

### Adding Responsive Behavior
```scss
.component {
  @include mobile {
    // Mobile styles
  }
  
  @include tablet {
    // Tablet styles
  }
  
  @include desktop {
    // Desktop styles
  }
}
```

## Maintenance

### Adding New Variables
- Add to `_variables.scss`
- Update documentation
- Consider impact on existing components

### Component Updates
- Update component-specific SCSS file
- Test across all breakpoints
- Ensure accessibility compliance

### Performance Monitoring
- Monitor CSS bundle size
- Check animation performance
- Validate responsive behavior 