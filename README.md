# adapt-quicknav

**Quicknav** is a *presentation component* that adds basic navigation controls to a page

<img src="demo.gif" alt="the quicknav extension in action" align="right">

## Settings Overview

The attributes listed below are used in *components.json* to configure **Hotgrid**, and are properly formatted as JSON in [*example.json*](https://github.com/cgkineo/adapt-hotgrid/blob/master/example.json).

Navigation bar component which can contain some or all of the following buttons:

- _returnToPreviousLocation (takes you back to the previous location - not back in history, just the last routed location)
- _home (takes you back to top level menu)
- _up (takes you to the menu the next level up in the hierarchy)
- _previous (navigates directly to the previous page, if exists, without having to navigate via the menu)
- _next (navigates directly to the next page, if exists, without having to navigate via the menu)
- _sibling (1,2,3,4 etc buttons representing each sibling page)
- _close (closes the course window - only possible if the course was launched in a popup window)

The quicknav buttons will respect any [locking](https://github.com/adaptlearning/adapt_framework/wiki/Locking-objects-with-'_isLocked'-and-'_lockType'#using-locking-with-menus) that has been configured in Adapt. In cases not covered by Adapt's locking system - such as a [start page](https://github.com/adaptlearning/adapt_framework/wiki/Content-starts-with-course.json#example-1) that appears immediately before the main menu - the setting `_lockUntilPageComplete` can be used to disable the button until the current page has been completed.

### Attributes

[**core model attributes**](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes): These are inherited by every Adapt component. [Read more](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes).

**\_component** (string): This value must be: `hotgrid`. (One word.)

**\_classes** (string): CSS class name to be applied to **Hotgrid**’s containing `div`. The class must be predefined in one of the Less files. Separate multiple classes with a space.

**\_layout** (string): This defines the horizontal position of the component in the block. Acceptable values are `full`, `left` or `right`.

**instruction** (string): This optional text appears above the component. It is frequently used to guide the learner’s interaction with the component.

**\_loopStyle** (string): Acceptable values are `allPages`, `siblings`, and `none`. `allPages` = loop sequentially through all pages in course. `siblings` = loop sequentially through all pages in current parent object. `none` = disable previous and next buttons at start and end of the pages in the current parent object.

**\_buttons** (object): It contains values for **\_returnToPreviousLocation**, **\_previous**, **\_root**, **\_up**, **\_next**, **\_sibling**, and **\_close**.

>**\_returnToPreviousLocation** (object): It contains values for **\_isEnabled**, **\_order**, **\_classes**, **\_iconClass**, **\_alignIconRight**, **text**, **ariaLabel**, **\_showTooltip**, **tooltip**, and **\_customRouteId**.

>>**\_isEnabled** (boolean): Turns the **Quicknav** **\_returnToPreviousLocation** button on and off. Acceptable values are `true` and `false`.

>>**\_order** (number): Defines the display order of the button. Numerical order with 0 rendering first.

>>**\_classes** (string): CSS class name to be applied to **\_returnToPreviousLocation**’s `button`. The class must be predefined in one of the Less files. Separate multiple classes with a space.

>>**\_iconClass** (string): CSS class name to be applied to **\_returnToPreviousLocation**'s icon. The class must be predefined in one of the Less files with the corresponding icon be added as part of a font.

>>**\_alignIconright** (boolean): Defines whether the icon is aligned to the left or right of the text. Default is `false` which aligns the icon to the left of the text.

>>**text** (string): Defines the text that renders in the `button`.

>>**ariaLabel** (string): This text is associated with the button. It renders as part of the aria label to give screen readers more information.

>>**\_showTooltip** (boolean): Defines whether the tooltip renders on hover. Default is `false`.

>>**tooltip** (string): Defines the text that renders in the tooltip.

>**\_previous** (object): It contains values for **\_isEnabled**, **\_order**, **\_classes**, **\_iconClass**, **\_alignIconRight**, **text**, **ariaLabel**, **\_showTooltip**, and **tooltip**.

>>**\_isEnabled** (boolean): Turns the **Quicknav** **\_previous** button on and off. Acceptable values are `true` and `false`.

>>**\_order** (number): Defines the display order of the button. Numerical order with 0 rendering first.

>>**\_classes** (string): CSS class name to be applied to **\_previous**’s `button`. The class must be predefined in one of the Less files. Separate multiple classes with a space.

>>**\_iconClass** (string): CSS class name to be applied to **\_previous**'s icon. The class must be predefined in one of the Less files with the corresponding icon be added as part of a font.

>>**\_alignIconright** (boolean): Defines whether the icon is aligned to the left or right of the text. Default is `false` which aligns the icon to the left of the text.

>>**text** (string): Defines the text that renders in the `button`.

>>**ariaLabel** (string): This text is associated with the button. It renders as part of the aria label to give screen readers more information.

>>**\_showTooltip** (boolean): Defines whether the tooltip renders on hover. Default is `false`.

>>**tooltip** (string): Defines the text that renders in the tooltip.

>>**\_customRouteId** (string): Overrides the route ID. For use when non standard route navigation is required.

>**\_root** (object): It contains values for **\_isEnabled**, **\_order**, **\_classes**, **\_iconClass**, **\_alignIconRight**, **text**, **ariaLabel**, **\_showTooltip**, **tooltip**, and **\_customRouteId**.

>>**\_isEnabled** (boolean): Turns the **Quicknav** **\_root** button on and off. Acceptable values are `true` and `false`.

>>**\_order** (number): Defines the display order of the button. Numerical order with 0 rendering first.

>>**\_classes** (string): CSS class name to be applied to **\_root**’s `button`. The class must be predefined in one of the Less files. Separate multiple classes with a space.

>>**\_iconClass** (string): CSS class name to be applied to **\_root**'s icon. The class must be predefined in one of the Less files with the corresponding icon be added as part of a font.

>>**\_alignIconright** (boolean): Defines whether the icon is aligned to the left or right of the text. Default is `false` which aligns the icon to the left of the text.

>>**text** (string): Defines the text that renders in the `button`.

>>**ariaLabel** (string): This text is associated with the button. It renders as part of the aria label to give screen readers more information.

>>**\_showTooltip** (boolean): Defines whether the tooltip renders on hover. Default is `false`.

>>**tooltip** (string): Defines the text that renders in the tooltip.

>>**\_customRouteId** (string): Overrides the route ID. For use when non standard route navigation is required.

>**\_up** (object): It contains values for **\_isEnabled**, **\_order**, **\_classes**, **\_iconClass**, **\_alignIconRight**, **text**, **ariaLabel**, **\_showTooltip**, **tooltip**, and **\_customRouteId**.

>>**\_isEnabled** (boolean): Turns the **Quicknav** **\_up** button on and off. Acceptable values are `true` and `false`.

>>**\_order** (number): Defines the display order of the button. Numerical order with 0 rendering first.

>>**\_classes** (string): CSS class name to be applied to **\_up**’s `button`. The class must be predefined in one of the Less files. Separate multiple classes with a space.

>>**\_iconClass** (string): CSS class name to be applied to **\_up**'s icon. The class must be predefined in one of the Less files with the corresponding icon be added as part of a font.

>>**\_alignIconright** (boolean): Defines whether the icon is aligned to the left or right of the text. Default is `false` which aligns the icon to the left of the text.

>>**text** (string): Defines the text that renders in the `button`.

>>**ariaLabel** (string): This text is associated with the button. It renders as part of the aria label to give screen readers more information.

>>**\_showTooltip** (boolean): Defines whether the tooltip renders on hover. Default is `false`.

>>**tooltip** (string): Defines the text that renders in the tooltip.

>>**\_customRouteId** (string): Overrides the route ID. For use when non standard route navigation is required.

>**\_next** (object): It contains values for **\_isEnabled**, **\_order**, **\_classes**, **\_iconClass**, **\_alignIconRight**, **text**, **ariaLabel**, **\_showTooltip**, **tooltip**, and **\_customRouteId**.

>>**\_isEnabled** (boolean): Turns the **Quicknav** **\_next** button on and off. Acceptable values are `true` and `false`.

>>**\_order** (number): Defines the display order of the button. Numerical order with 0 rendering first.

>>**\_classes** (string): CSS class name to be applied to **\_next**’s `button`. The class must be predefined in one of the Less files. Separate multiple classes with a space.

>>**\_iconClass** (string): CSS class name to be applied to **\_next**'s icon. The class must be predefined in one of the Less files with the corresponding icon be added as part of a font.

>>**\_alignIconright** (boolean): Defines whether the icon is aligned to the left or right of the text. Default is `false` which aligns the icon to the left of the text.

>>**text** (string): Defines the text that renders in the `button`.

>>**ariaLabel** (string): This text is associated with the button. It renders as part of the aria label to give screen readers more information.

>>**\_showTooltip** (boolean): Defines whether the tooltip renders on hover. Default is `false`.

>>**tooltip** (string): Defines the text that renders in the tooltip.

>>**\_customRouteId** (string): Overrides the route ID. For use when non standard route navigation is required.

>**\_sibling** (object): It contains values for **\_isEnabled**, **\_order**, **\_classes**, **\_iconClass**, **\_alignIconRight**, **text**, **ariaLabel**, **\_showTooltip**, **tooltip**, and **\_customRouteId**.

>>**\_isEnabled** (boolean): Turns the **Quicknav** **\_sibling** button on and off. Acceptable values are `true` and `false`.

>>**\_order** (number): Defines the display order of the button. Numerical order with 0 rendering first.

>>**\_classes** (string): CSS class name to be applied to **\_sibling**’s `button`. The class must be predefined in one of the Less files. Separate multiple classes with a space.

>>**\_iconClass** (string): CSS class name to be applied to **\_sibling**'s icon. The class must be predefined in one of the Less files with the corresponding icon be added as part of a font.

>>**\_alignIconright** (boolean): Defines whether the icon is aligned to the left or right of the text. Default is `false` which aligns the icon to the left of the text.

>>**text** (string): Defines the text that renders in the `button`.

>>**ariaLabel** (string): This text is associated with the button. It renders as part of the aria label to give screen readers more information.

>>**\_showTooltip** (boolean): Defines whether the tooltip renders on hover. Default is `false`.

>>**tooltip** (string): Defines the text that renders in the tooltip.

>>**\_customRouteId** (string): Overrides the route ID. For use when non standard route navigation is required.

>**\_close** (object): It contains values for **\_isEnabled**, **\_order**, **\_classes**, **\_iconClass**, **\_alignIconRight**, **text**, **ariaLabel**, **\_showTooltip**, **tooltip**, and **\_customRouteId**.

>>**\_isEnabled** (boolean): Turns the **Quicknav** **\_close** button on and off. Acceptable values are `true` and `false`.

>>**\_order** (number): Defines the display order of the button. Numerical order with 0 rendering first.

>>**\_classes** (string): CSS class name to be applied to **\_close**’s `button`. The class must be predefined in one of the Less files. Separate multiple classes with a space.

>>**\_iconClass** (string): CSS class name to be applied to **\_close**'s icon. The class must be predefined in one of the Less files with the corresponding icon be added as part of a font.

>>**\_alignIconright** (boolean): Defines whether the icon is aligned to the left or right of the text. Default is `false` which aligns the icon to the left of the text.

>>**text** (string): Defines the text that renders in the `button`.

>>**ariaLabel** (string): This text is associated with the button. It renders as part of the aria label to give screen readers more information.

>>**\_showTooltip** (boolean): Defines whether the tooltip renders on hover. Default is `false`.

>>**tooltip** (string): Defines the text that renders in the tooltip.

>>**\_customRouteId** (string): Overrides the route ID. For use when non standard route navigation is required.

----------------------------
**Version number:**  4.0.0  
**Framework versions:**  5+  
**Author / maintainer:**  Kineo  
**Accessibility support:**  WAI AA  
**RTL support:**  Yes  
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, IE11, Safari 11+12 for macOS+iOS, Opera  
