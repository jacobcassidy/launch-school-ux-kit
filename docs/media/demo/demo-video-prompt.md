# Demo Video Prompt

## General Instructions

- Record the video at a full 1920 x 1080 resolution.
- Present the PWA as an isolated window with rounded corners, a macOS-style drop shadow, and padding on a clean background, matching that window-screenshot appearance. The video can remain 1920 × 1080, with the PWA window slightly smaller to leave room for the shadow and padding.
- Use the Launch School PWA for the video. Don't use a browser window.
- 0.5s before each UI action, display a card at the center of the screen.
- If an action transition is shorter than the card display, wait 0.5 seconds after the card finishes fading out before beginning the next card fade in.
- Don't allow any buttons to get a focus outline or if one gets it, remove it right away.

Before starting the video:

- The LSBot tab panel should be reset so it's a new conversation.
- The Scratchpad tab panel should only have the starting text: "# Scratchpad - try out your code here".
- All settings panel UI options should be off.

## Card

- A card has a dark gray, transparent background, rounded corners, and a padding of 48px on all sides.
- A card is only as wide as needed for the content to fit.
- Each card may have a title and shortcut, though they don't always have to have both.
- When a card has both a title and shortcut, the title goes on the first line and the shortcut goes on the 2nd line.
- Titles have a white font color and normal font-weight.
- Shortcuts have a 1:1 square background around each shortcut key with rounded corners. The background should be transparent and slightly darker than the card. A gap of 4px is used between each key box. If the shortcut is longer than one character, such as "Enter", allow the key box to be a rectangle instead of a square. Keep the same inline padding on the sides of the rectangle and squares. Shortcuts use a red font color.
- Cards should fade-in over 0.5 seconds, display for 2 seconds, and then fade-out over 0.5 seconds. So cards will display for 3 seconds total including the fade-in and fade-out.
- Cards should begin fading in 0.5 second before the UI action is executed.

## Circle Outline

- Whenever a shortcut has a matching header button, circle the buttons with a red border at the same time the card fades in. Remove the circle at the same time the card fades out.

### Highlight

- When specified, add a transparent yellow background to an element. Flash highlights should highlight the element for 0.5s.

## Video Steps

1. Show the full UI with a card containing the title "Launch School UX Kit Demo". The card will show for 3 seconds (0.5s fade in, 2 second show, 0.5s fade out).
2. Open the settings panel (cmd+ctrl+,) with the title "Show Settings Panel" and the shortcut below it. At the same time the card fades in, outline circle the header settings button. When the card fades out, remove the outline circle.
3. Toggle "Hide sidebar's section headers" on. At the same time the card fades in, outline circle the toggle button. When the card fades out, remove the outline circle. Also, at the same time the card fades in, highlight the section titles. When the headers are turned off, hide the highlight.
4. Toggle "Hide sidebar's section headers" off. At the same time the card fades in, outline circle the toggle button. When the card fades out, remove the outline circle. Also, at the same time the card fades in, highlight the section titles. When the card fades out, hide the highlight.
5. Close the sidebar (cmd+b). Use the card title "Hide Sidebar". At the same time that the card fades in, flash highlight the sidebar. Also, at the same time the card fades in, outline circle the header sidebar button. When the card fades out, remove the outline circle.
6. Toggle "Shrink sidebar instead of hiding it when closed" on. Use the card title "Shrink Sidebar Instead of Hiding". At the same time the card fades in, outline circle the toggle button. When the card fades out, remove the outline circle. Flash highlight the shrunken sidebar when it shows.
7. Toggle "Shrink sidebar instead of hiding it when closed" off. At the same time the card fades in, outline circle the toggle button. When the card fades out, remove the outline circle.
8. Close the settings panel (cmd+ctrl+,). The card title is "Close Settings". At the same time the card fades in, outline circle the header settings button. When the card fades out, remove the outline circle.
9. Open the Table of Contents panel (cmd+ctrl+t). The card title is "Show Table of Contents". At the same time the card fades in, outline circle the header's Table of Contents button. When the card fades out, remove the outline circle. Wait 0.5 seconds after the table of contents shows, then scroll down until you reach the table of contents before moving to the next action.
10. Close the table of contents panel (cmd+ctrl+t). The card title is "Hide Table of Contents". At the same time the card fades in, outline circle the header's Table of Contents button. When the card fades out, remove the outline circle.
11. Active tab #1 (cmd+ctrl+1). The card title is "Focus Tab #1 (Ask LSBot)". At the same time the card fades in, flash highlight the tab #1 and the tab panel, but not tab #2 nor #3)
12. After the previous card fades out, type a prompt one letter at a time, slow enough so it looks like it being typed out, but still fast. No card will display for this action.
13. Submit the prompt (Enter). The Card title is "Submit LSBot prompt". The card will display normally (0.5s fade in, 2 second hold, 0.5s fade out), but the next action will not begin until the LSBot response displays. Wait 0.5s after it displays before starting the fade in for the next card.
14. Active tab #2 (cmd+ctrl+2). The card title is "Focus Tab #2 (Scratchpad)". Flash highlight the #2 tab and panel, but not tab #1 nor #3. Do not use the (cmd+ctrl+e) shortcut; we will not include it in this video.
15. On the line after the "# Scratchpad - try out your code here" line, type out "print("Hello, Launch School!")". Wait 0.5 seconds before the next action card begins the fade in. No card displays for this action.
16. Run code (cmd+s). The card title is "Run code". Flash highlight the code output from the run.
17. Active tab #3 (cmd+ctrl+3). The card title is "Focus Tab #3 (Give Feedback)". Flash highlight the #3 tab and panel, but not tab #1 nor #2.
18. In the Give Feedback textbox, type "I love Launch School!". Wait 0.5 seconds before starting the card fade in for the next action.
19. Hide the Tabs Panel (cmd+shift+2). The card title is "Hide Tabs Panel". When the card starts fading in, flash highlight the whole tabs panel.
20. Hide the header (cmd+shift+1). The card title is "Hide Header". When the card starts fading in, flash highlight the header.
21. Scroll the content left. After 0.5 seconds of scrolling, fade in a card that says "Enjoy!". Leave that card for the rest of the video. Scroll to the bottom of the content, wait 1s, and then end the video.
