# Launch School UX Kit

<!-- markdownlint-disable MD033 -->
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/design/branding/logo/launch-school-ux-kit-logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="docs/design/branding/logo/launch-school-ux-kit-logo.svg">
  <img alt="Launch School UX Kit logo" src="docs/design/branding/logo/launch-school-ux-kit-logo.svg">
</picture>
<!-- markdownlint-enable MD033 -->

An unofficial UX kit that modifies the LaunchSchool.com UI with a minimal design and added shortcuts for productivity (shortcuts that toggle the header, menus, sidebar, tabs, and more).

| Index                           |
| ------------------------------- |
| [Demo](#demo)                   |
| [Screenshots](#screenshots)     |
| [Quickstart](#quickstart-guide) |
| [Features](#features)           |
| [Notes](#notes)                 |
| [Documentation](#documentation) |
| [Issues?](#issues)              |

## Demo

<!-- markdownlint-disable MD034 -->

https://github.com/user-attachments/assets/14481f07-509f-40ba-b998-d61e6d0efdc1

<!-- markdownlint-enable MD034 -->

## Screenshots

**With all panels showing on a book page:**
![All Panels Open](docs/media/screenshots/v1.5.0/01-full-ui.png)

**With the Sidebar panel shrunk:**
![Sidebar Shrunk](docs/media/screenshots/v1.5.0/02-sidebar-shrunk.png)

**With the Sidebar panel hidden:**
![Sidebar Hidden](docs/media/screenshots/v1.5.0/03-sidebar-hidden.png)

**With the Header panel hidden:**
![Header Hidden](docs/media/screenshots/v1.5.0/04-header-hidden.png)

**With the Header, Sidebar, and Tabs panels hidden (only content visible for no distractions):**
![Content Only](docs/media/screenshots/v1.5.0/05-content-only.png)

**With Table of Contents menu open:**
![Table of Contents Menu](docs/media/screenshots/v1.5.0/06-toc-menu.png)

**With Settings menu open:**
![Settings Menu](docs/media/screenshots/v1.5.0/07-settings-menu.png)

## Quickstart Guide

1. Install the [Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) browser extension (or an equivalent extension).
2. Open the Tampermonkey extension's dashboard.
3. Click on the dashboard's `+` tab to create a new script.
4. Copy the code from [dist/index.min.js](dist/index.min.js), then paste it into the Tampermonkey editor and save it (`⌘S` on macOS or `⌃S` on Windows).
5. Go to [launchschool.com](https://launchschool.com) or refresh the page if you're already there and the script should now be active (if not, check your Tampermonkey extension settings to make sure it's active on launchschool.com).

To update an existing installation, open its script in Tampermonkey, replace the contents with the latest code from step 4, save, and refresh Launch School.

> [!TIP]
> If you want the clean look from the screenshots (no URL bar, tabs, browser nav, etc), do the following:
>
> 1. Open launchschool.com in the Safari browser.
> 2. Select `File > Add to Dock...`
> 3. Make the title "Launch School" and click "Add".
> 4. Open the new Launch School Safari app you just created.
> 5. Open settings (in the menubar, click `Launch School > Settings` or use the `⌘,` shortcut).
> 6. In the Setting's "General" tab, deselect "Show navigation controls".
> 7. In the Setting's "Extensions" tab, click "Browse Extensions" and install "Tampermonkey" (or an equivalent extension).
> 8. Then follow the rest of the [Quickstart Guide](#quickstart-guide) above to complete the setup.

## Features

- Refines the UI for a more minimal style, especially when closing panels such as the sidebar or tabs panel.
- Adds a toggleable page header panel with the page's breadcrumbs/title and buttons to control the visibility of other panels (settings, sidebar, tabs, and table of contents).
- Adds shortcuts for macOS and Windows to toggle panel visibility (header, menus, sidebar, and tabs), so you can display only what you need for minimizing distractions.
- Shows available shortcut combinations in button and tab tooltips, with alternate combinations separated by "or".
- Centers header titles and breadcrumbs while keeping the panel controls accessible when space is limited.
- Refines the sidebar UX with muted colors and reorganized link groups (with heading labels) and a more minimal sidebar when shrunken.
- Adds a Settings menu to completely hide or shrink the sidebar, show/hide sidebar group titles, and see the current page's available shortcuts. The shortcut list refreshes as page controls are added, removed, or replaced.
- Shows brief notifications for actions such as copying code or using a shortcut whose action is unavailable on the current page. Notifications are also announced to screen readers.
- Supports keyboard navigation in Settings. Close it with `Esc`; if focus was inside the menu, it returns to the Settings button. Hidden header, Settings, and tabs-panel controls are excluded from keyboard navigation.
- Focuses/refocuses the LSBot prompt textarea when a prompt submission completes (including from a question box in the content panel).
- Automatically focuses the textarea of a selected panel (such as the LSBot tab).
- Adds a blue background flash to an already active tab/textarea that is activated again via a shortcut so you can quickly see where the active focus is.

- Added shortcuts:

  | macOS   | Windows | Function                                                                   |
  | ------- | ------- | -------------------------------------------------------------------------- |
  | `Enter` | `Enter` | Submit focused chat prompt                                                 |
  | `⌘B`    | `⌃B`    | Toggles Sidebar visibility                                                 |
  | `⌘⇧1`   | `⌃⇧1`   | Toggles Header visibility                                                  |
  | `⌘⇧2`   | `⌃⇧2`   | Toggle Tabs Panel visibility                                               |
  | `⌘⌃#`   | `⌃⎇#`   | Select tab by number order (such as 1 for the "Ask LSBot" tab)             |
  | `⌘⌃C`   | `⌃⎇C`   | Copy Editor/Scratchpad Code                                                |
  | `⌘⌃E`   | `⌃⎇E`   | Focus Editor/Scratchpad                                                    |
  | `⌘⌃M`   | `⌃⎇M`   | Toggle the "Mark exercise complete/incomplete" _(active on exercise page)_ |
  | `⌘⌃N`   | `⌃⎇N`   | Go to next exercise _(active on exercise page)_                            |
  | `⌘⌃R`   | `⌃⎇R`   | Submit review to LSBot _(active on exercise page)_                         |
  | `⌘⌃T`   | `⌃⎇T`   | Toggle Table of Contents visibility _(active on book page)_                |
  | `⌘⌃,`   | `⌃⎇,`   | Toggle Settings visibility (include Current Page Shortcuts)                |

Shortcut modifiers in tooltips and settings use `⌘` (Command), `⌃` (Control), `⇧` (Shift), and `⎇` (Alt).

Keys displayed together, such as `⌘⌃C`, are pressed together. Numbered tab shortcuts follow the order of visible tabs. Open Settings to see the combinations available on your current page.

## Notes

- Shortcuts, the current-page shortcut list, and button tooltips automatically use macOS or Windows keys for your platform.
- This kit only works for desktop views. The UI will break on screen sizes narrower than 1025px wide.
- You can toggle the userscript off at anytime and reload the page to get the original UX back.
- This kit modifies the existing DOM of launchschool.com. If the launchschool.com DOM changes in the future, this kit may cease to function. If that happens, please [report the issue](https://github.com/jacobcassidy/launch-school-ux-kit/issues).

## Documentation

See the [Changelog](CHANGELOG.md), [Contributing](CONTRIBUTING.md) for development setup and checks, and the [documentation index](docs/README.md) for architecture, reference guides, and historical media.

## Issues?

If you come across any issues, please feel free to [report them here](https://github.com/jacobcassidy/launch-school-ux-kit/issues). You are also welcome to [create a pull request](https://github.com/jacobcassidy/launch-school-ux-kit/pulls). If your PR code is AI generated, please fully review the code and mention you have done so, otherwise it may be automatically closed without being reviewed/merged.
