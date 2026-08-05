# Launch School UI Script

An unofficial script for modifying the LaunchSchool.com UI for a cleaner, minimal design with added hotkeys for toggling the header, tabs, panels, menus, and the sidebar.

| Index                                 |
| ------------------------------------- |
| [Screenshots](#screenshots)           |
| [Quickstart Guide](#quickstart-guide) |
| [Features](#features)                 |
| [Notes](#notes)                       |
| [Issues?](#issues)                    |

## Screenshots

**With all panels showing on a book page - Header, Sidebar, Content, and Tabs Panel:**
![All Panels Open](https://raw.githubusercontent.com/jacobcassidy/launch-school-ui-script/refs/heads/main/docs/reference/screenshots/v1.1.0/01-full-ui.png)

**With Sidebar shrunk:**
![Sidebar Shrunk](https://raw.githubusercontent.com/jacobcassidy/launch-school-ui-script/refs/heads/main/docs/reference/screenshots/v1.1.0/02-sidebar-shrunk.png)

**With Sidebar hidden:**
![Sidebar Hidden](https://raw.githubusercontent.com/jacobcassidy/launch-school-ui-script/refs/heads/main/docs/reference/screenshots/v1.1.0/03-sidebar-hidden.png)

**With Header hidden:**
![Header Hidden](https://raw.githubusercontent.com/jacobcassidy/launch-school-ui-script/refs/heads/main/docs/reference/screenshots/v1.1.0/04-header-hidden.png)

**With Header, Sidebar, and Tabs Panel closed (only content visible):**
![Content Only](https://raw.githubusercontent.com/jacobcassidy/launch-school-ui-script/refs/heads/main/docs/reference/screenshots/v1.1.0/05-content-only.png)

**Table of Contents Menu:**
![Table of Contents Menu](https://raw.githubusercontent.com/jacobcassidy/launch-school-ui-script/refs/heads/main/docs/reference/screenshots/v1.1.0/06-toc-menu.png)

**SettingsMenu:**
![Settings Menu](https://raw.githubusercontent.com/jacobcassidy/launch-school-ui-script/refs/heads/main/docs/reference/screenshots/v1.1.0/07-settings-menu.png)

## Quickstart Guide

1. Install the [Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) extension (or an equivalent extension).
2. Open the Tampermonkey extension dashboard.
3. Click on the dashboard's `+` tab to create a new script.
4. Copy the code from [/dist/js/index.min.js](https://github.com/jacobcassidy/launch-school-ui-script/blob/main/dist/js/index.min.js) then paste it into the Tampermonkey editor and save it (`CMD + S`).
5. Go to [launchschool.com](https://launchschoo.com) or refresh the page if you're already there and the script should now be active (if not, check your Tampermonkey extension settings to make sure it's active on launchschool.com).

> [!TIP]
> If you want the clean look from the screenshots (no URL bar, tabs, browser nav, etc), do the following:
>
> 1. Open launchschool.com in the Safari browser.
> 2. Select `File > Add to Dock...`
> 3. Make the title "Launch School" and click "Add".
> 4. Open the new Launch School app you just created.
> 5. In the menubar, click `Launch School > Settings` or use the `CMD` + `,` settings hotkey.
> 6. In the Settings "General" tab, deselect "Show navigation controls".
> 7. In the Settings "Extensions" tab, click "Browse Extensions" and install "Tampermonkey" (or an equivalent extension).
> 8. Then follow the rest of the [Quickstart Guide](#quickstart-guide) above to complete the setup.

## Features

- A new page header with the following:
  - Button to toggle the Sidebar.
  - Button to toggle a book's Table of Contents menu visibility (when it exists).
  - Button to toggle the Tabs Panel visibility (when it exists).
  - Button to toggle the Settings menu visibility (which includes the Current Page Hotkeys).
  - Breadcrumbs placed center in the header (ff the page has no breadcrumbs, the page title is place center in the header instead).
  - Moved the logged-out nav to the header for logged-out users.
- A redesigned sidebar with sections and the ability to complete hide it from view.
- Added a blue background flash to an already active tab/textarea that is activated again via a hotkey so you can quickly see where the active focus is.
- Added an automatic textbox focus when a tab or editor is selected via button click or hotkey.
- Added a toaster that will display messages for different actions, such as activating the Copy Editor Code via hotkey.
- Added automatic LSBot tab focus when a question box answer is submitted in the content panel.
- Added automatic refocus of the LSBot prompt textarea after a prompt submission completes.
- Added a container that displays the current page's hotkeys in the Settings Menu.

- Added hotkeys:

  | Hotkey            | Function                                                                   |
  | ----------------- | -------------------------------------------------------------------------- |
  | `CMD + B`         | Toggles Sidebar visibility                                                 |
  | `CMD + Shift + 1` | Toggles Header visibility                                                  |
  | `CMD + Shift + 2` | Toggle Tabs Panel visibility                                               |
  | `CMD + CTRL + #`  | Select tab by number order (such as 1 for the "Ask LSBot" tab)             |
  | `CMD + CTRL + C`  | Copy Editor/Scratchpad Code                                                |
  | `CMD + CTRL + E`  | Focus Editor/Scratchpad                                                    |
  | `CMD + CTRL + M`  | Toggle the "Mark exercise complete/incomplete" _(active on exercise page)_ |
  | `CMD + CTRL + N`  | Go to next exercise _(active on exercise page)_                            |
  | `CMD + CTRL + R`  | Submit review to LSBot _(active on exercise page)_                         |
  | `CMD + CTRL + T`  | Toggle Table of Contents visibility _(active on book page)_                |
  | `CMD + CTRL + ,`  | Toggle Settings visibility (include Current Page Hotkeys)                  |

## Notes

- This script was developed for macOS. Windows/Linux have not been tested, though you may fork and modify the script however you'd like for your OS.
- This script is only for desktop views. It will break the UI on screen sizes narrower than 1025px wide.
- You can toggle the userscript off at anytime and reload the page to get the original official UI back.
- This script modifies the existing DOM of launchschool.com. If the launchschool.com DOM changes in the future, this script may cease to function. If that happens, please [report the issue](https://github.com/jacobcassidy/launch-school-ui-script/issues).

## Issues?

If you come across any issues, please feel free to [report them here](https://github.com/jacobcassidy/launch-school-ui-script/issues). You are also welcome to [create a pull request](https://github.com/jacobcassidy/launch-school-ui-script/pulls). If your PR code is AI generated, please fully review the code and mention you have done so, otherwise it may be automatically closed without being reviewed/merged.
