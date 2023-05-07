type HexColor = `#${string}`;

type InvoiceStatus = 'paid' | 'cancelled' | 'failed' | 'pending';

type EventType = 'themeChanged'
    | 'viewportChanged'
    | 'mainButtonClicked'
    | 'backButtonClicked'
    | 'settingsButtonClicked'
    | 'invoiceClosed'
    | 'popupClosed'
    | 'qrTextReceived'
    | 'clipboardTextReceived';

type EventHandlerParams = {
    'themeChanged': void;
    'viewportChanged': { isStateStable: boolean } ;
    'mainButtonClicked': void;
    'backButtonClicked': void;
    'settingsButtonClicked': void;
    'invoiceClosed': { url: string; status: InvoiceStatus };
    'popupClosed': { button_id: string };
    'qrTextReceived': { data: string };
    'clipboardTextReceived': { data: string | null };
}

/**
 * This object represents a chat.
 */
interface WebAppChat {
    /**
     * Unique identifier for this chat. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier.
     */
    id: number;
    /**
     * Type of chat, can be either “group”, “supergroup” or “channel”
     */
    type: 'group' | 'supergroup' | 'channel';
    /**
     * Title of the chat
     */
    title: string;
    /**
     * _Optional_. Username of the chat
     */
    username?: string;
    /**
     * _Optional_. URL of the chat’s photo. The photo can be in .jpeg or .svg formats. Only returned for Web Apps launched from the attachment menu.
     */
    photo_url?: string;
}

/**
 * This object contains the data of the Web App user.
 */
interface WebAppUser {
    /**
     * A unique identifier for the user or bot. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. It has at most 52 significant bits, so a 64-bit integer or a double-precision float type is safe for storing this identifier.
     */
    id: number;
    /**
     * _Optional_. _True_, if this user is a bot. Returns in the [receiver](https://core.telegram.org/bots/webapps#webappinitdata) field only.
     */
    is_bot?: boolean;
    /**
     * First name of the user or bot.
     */
    first_name: string;
    /**
     * _Optional_. Last name of the user or bot.
     */
    last_name?: string;
    /**
     * _Optional_. Username of the user or bot.
     */
    username?: string;
    /**
     * _Optional_. [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) of the user's language. Returns in _user_ field only.
     */
    language_code?: string;
    /**
     * _Optional_. _True_, if this user is a Telegram Premium user
     */
    is_premium?: boolean;
    /**
     * _Optional_. URL of the user’s profile photo. The photo can be in .jpeg or .svg formats. Only returned for Web Apps launched from the attachment menu.
     */
    photo_url?: string;
}

/**
 * This object contains data that is transferred to the Web App when it is opened. It is empty if the Web App was launched from a [keyboard button](https://core.telegram.org/bots/webapps#keyboard-button-web-apps) or from [inline mode](https://core.telegram.org/bots/webapps#inline-mode-web-apps).
 */
interface WebAppInitData {
    /**
     * _Optional._ A unique identifier for the Web App session, required for sending messages via the [answerWebAppQuery](/bots/api#answerwebappquery) method.
     */
    query_id?: string;
    /**
     * _Optional._ An object containing data about the current user.
     */
    user?: WebAppUser;
    /**
     * _Optional._ An object containing data about the chat partner of the current user in the chat where the bot was launched via the attachment menu. Returned only for private chats and only for Web Apps launched via the attachment menu.
     */
    receiver?: WebAppUser;
    /**
     * _Optional._ An object containing data about the chat where the bot was launched via the attachment menu. Returned for supergroups, channels and group chats – only for Web Apps launched via the attachment menu.
     */
    chat?: WebAppChat;
    /**
     * _Optional._ Type of the chat from which the Web App was opened. Can be either “sender” for a private chat with the user opening the link, “private”, “group”, “supergroup”, or “channel”. Returned only for Web Apps launched from direct links.
     */
    chat_type?: 'sender' |'private' | 'group' | 'supergroup' |'channel';
    /**
     * _Optional._ Global identifier, uniquely corresponding to the chat from which the Web App was opened. Returned only for Web Apps launched from a direct link.
     */
    chat_instance?: string;
    /**
     * _Optional._ The value of the _startattach_ parameter, passed [via link](https://core.telegram.org/bots/webapps#adding-bots-to-the-attachment-menu). Only returned for Web Apps when launched from the attachment menu via link.
     * 
     * The value of the `start_param` parameter will also be passed in the GET-parameter `tgWebAppStartParam`, so the Web App can load the correct interface right away.
     */
    start_param?: string;
    /**
     * _Optional._ Time in seconds, after which a message can be sent via the [answerWebAppQuery](/bots/api#answerwebappquery) method.
     */
    can_send_after?: number;
    /**
     * Unix time when the form was opened.
     */
    auth_date: number;
    /**
     * A hash of all passed parameters, which the bot server can use to [check their validity](https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app).
     */
    hash: string;
}

/**
 * This object controls haptic feedback.
 */
interface HapticFeedback {
    /**
     * A method tells that an impact occurred. The Telegram app may play the appropriate haptics based on style value passed. Style can be one of these values:    
     * \- _light_, indicates a collision between small or lightweight UI objects,    
     * \- _medium_, indicates a collision between medium-sized or medium-weight UI objects,    
     * \- _heavy_, indicates a collision between large or heavyweight UI objects,    
     * \- _rigid_, indicates a collision between hard or inflexible UI objects,    
     * \- _soft_, indicates a collision between soft or flexible UI objects.
     */
    impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): HapticFeedback;
    /**
     * A method tells that a task or action has succeeded, failed, or produced a warning. The Telegram app may play the appropriate haptics based on type value passed. Type can be one of these values:    
     * \- _error_, indicates that a task or action has failed,    
     * \- _success_, indicates that a task or action has completed successfully,    
     * \- _warning_, indicates that a task or action produced a warning.
     */
    notificationOccurred(type: 'error' | 'success' | 'warning'): HapticFeedback;
    /**
     * A method tells that the user has changed a selection. The Telegram app may play the appropriate haptics.
     * 
     * _Do not use this feedback when the user makes or confirms a selection; use it only when the selection changes._
     */
    selectionChanged(): HapticFeedback;
}

/**
 * This object controls the main button, which is displayed at the bottom of the Web App in the Telegram interface.
 */
interface MainButton {
    /**
     * Current button text. Set to _CONTINUE_ by default.
     */
    text: string;
    /**
     * Current button color. Set to _themeParams.button\_color_ by default.
     */
    color: HexColor;
    /**
     * Current button text color. Set to _themeParams.button\_text\_color_ by default.
     */
    textColor: HexColor;
    /**
     * Shows whether the button is visible. Set to _false_ by default.
     */
    isVisible: boolean;
    /**
     * Shows whether the button is active. Set to _true_ by default.
     */
    isActive: boolean;
    /**
     * _Readonly._ Shows whether the button is displaying a loading indicator.
     */
    readonly isProgressVisible: boolean;
    /**
     * A method to set the button text.
     */
    setText(text: string): MainButton;
    /**
     * A method that sets the button press event handler. An alias for `Telegram.WebApp.onEvent('mainButtonClicked', callback)`
     */
    onClick(callback: (params: EventHandlerParams['mainButtonClicked']) => void): MainButton;
    /**
     * A method that removes the button press event handler. An alias for `Telegram.WebApp.offEvent('mainButtonClicked', callback)`
     */
    offClick(callback: (params: EventHandlerParams['mainButtonClicked']) => void): MainButton;
    /**
     * A method to make the button visible.  
     *
     * _Note that opening the Web App from the [attachment menu](https://core.telegram.org/bots/webapps#launching-web-apps-from-the-attachment-menu) hides the main button until the user interacts with the Web App interface._
     */
    show(): MainButton;
    /**
     * A method to hide the button.
     */
    hide(): MainButton;
    /**
     * A method to enable the button.
     */
    enable(): MainButton;
    /**
     * A method to disable the button.
     */
    disable(): MainButton;
    /**
     * A method to show a loading indicator on the button.
     * 
     * It is recommended to display loading progress if the action tied to the button may take a long time. By default, the button is disabled while the action is in progress. If the parameter `leaveActive=true` is passed, the button remains enabled.
     */
    showProgress(leaveActive?: true): MainButton;
    /**
     * A method to hide the loading indicator.
     */
    hideProgress(): MainButton;
    /**
     * A method to set the button parameters. The _params_ parameter is an object containing one or several fields that need to be changed:  
     * 
     * **text** - button text;    
     * **color** - button color;    
     * **text\_color** - button text color;    
     * **is\_active** - enable the button;    
     * **is\_visible** - show the button.    
     */
    setParams(params: {
        text?: string;
        color?: HexColor;
        text_color?: HexColor;
        is_active?: boolean;
        is_visible?: boolean
    }): MainButton;
}

/**
 * This object controls the **back** button, which can be displayed in the header of the Web App in the Telegram interface.
 */
interface BackButton {
    /**
     * Shows whether the button is visible. Set to _false_ by default.
     */
    isVisible: boolean;
    /**
     * A method that sets the button press event handler. An alias for `Telegram.WebApp.onEvent('backButtonClicked', callback)`
     */
    onClick(callback: (params: EventHandlerParams['backButtonClicked']) => void): BackButton;
    /**
     * A method that removes the button press event handler. An alias for `Telegram.WebApp.offEvent('backButtonClicked', callback)`
     */
    offClick(callback: (params: EventHandlerParams['backButtonClicked']) => void): BackButton;
    /**
     * A method to make the button active and visible.
     */
    show(): BackButton;
    /**
     * A method to hide the button.
     */
    hide(): BackButton;
}

/**
 * This object describes the native popup button.
 */
interface PopupButton {
    /**
     * _Optional_. Identifier of the button, 0-64 characters. Set to empty string by default.
     * 
     * If the button is pressed, its _id_ is returned in the callback and the _popupClosed_ event.
     */
    id?: string;
    /**
     * _Optional_. Type of the button. Set to _default_ by default.
     * 
     * Can be one of these values:    
     * \- _default_, a button with the default style,    
     * \- _ok_, a button with the localized text “OK”,    
     * \- _close_, a button with the localized text “Close”,    
     * \- _cancel_, a button with the localized text “Cancel”,    
     * \- _destructive_, a button with a style that indicates a destructive action (e.g. “Remove”, “Delete”, etc.).
     */
    type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
    /**
     * _Optional_. The text to be displayed on the button, 0-64 characters. Required if _type_ is _default_ or _destructive_. Irrelevant for other types.
     */
    text?: string;
}

/**
 * This object describes the native popup for scanning QR codes.
 */
interface ScanQrPopupParams {
    /**
     * _Optional_. The text to be displayed under the 'Scan QR' heading, 0-64 characters.
     */
    text?: string;
}

/**
 * This object describes the native popup.
 */
interface PopupParams {
    /**
     * _Optional_. The text to be displayed in the popup title, 0-64 characters.
     */
    title?: string;
    /**
     * The message to be displayed in the body of the popup, 1-256 characters.
     */
    message: string;
    /**
     * _Optional_. List of buttons to be displayed in the popup, 1-3 buttons. Set to _\[{“type”:“close”}\]_ by default.
     */
    buttons?: PopupButton[]
}

/**
 * Web Apps can [adjust the appearance](https://core.telegram.org/bots/webapps#color-schemes) of the interface to match the Telegram user's app in real time. This object contains the user's current theme settings:
 */
interface ThemeParams {
    /**
     * _Optional_. Background color in the `#RRGGBB` format.
     *
     * Also available as the CSS variable `var(--tg-theme-bg-color)`.
     */
    bg_color?: HexColor;
    /**
     * _Optional_. Main text color in the `#RRGGBB` format.
     *
     * Also available as the CSS variable `var(--tg-theme-text-color)`.
     */
    text_color?: HexColor;
    /**
     * _Optional_. Hint text color in the `#RRGGBB` format.
     * 
     * Also available as the CSS variable `var(--tg-theme-hint-color)`.
     */
    hint_color?: HexColor;
    /**
     * _Optional_. Link color in the `#RRGGBB` format.
     * 
     * Also available as the CSS variable `var(--tg-theme-link-color)`.
     */
    link_color?: HexColor;
    /**
     * _Optional_. Button color in the `#RRGGBB` format.
     * 
     * Also available as the CSS variable `var(--tg-theme-button-color)`.
     */
    button_color?: HexColor;
    /**
     * _Optional_. Button text color in the `#RRGGBB` format.
     * 
     * Also available as the CSS variable `var(--tg-theme-button-text-color)`.
     */
    button_text_color?: HexColor;
    /**
     * 
     * _Optional_. Secondary background color in the `#RRGGBB` format.
     * 
     * Also available as the CSS variable `var(--tg-theme-secondary-bg-color)`.
     */
    secondary_bg_color?: HexColor;
}

/**
 * To connect your Web App to the Telegram client, place the script [telegram-web-app.js](https://telegram.org/js/telegram-web-app.js) in the `<head>` tag before any other scripts, using this code:
 *
 *    \<script src="https://telegram.org/js/telegram-web-app.js"></script>
 *
 * Once the script is connected, a `window.Telegram.WebApp` object will become available with the following fields
 */
interface WebApp {
    /**
     * A string with raw data transferred to the Web App, convenient for [validating data](https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app).
     * 
     * **WARNING**: [Validate data](https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app) from this field before using it on the bot's server.
     */
    initData: string;
    /**
     * An object with input data transferred to the Web App.
     * 
     * **WARNING:** Data from this field should not be trusted. You should only use data from _initData_ on the bot's server and only after it has been [validated](https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app).
     */
    initDataUnsafe: WebAppInitData;
    /**
     * The version of the Bot API available in the user's Telegram app.
     */
    version: string;
    /**
     * The name of the platform of the user's Telegram app.
     */
    platform: string;
    /**
     * The color scheme currently used in the Telegram app. Either “light” or “dark”.
     * 
     * Also available as the CSS variable `var(--tg-color-scheme)`.
     */
    colorScheme: 'light' | 'dark';
    /**
     * An object containing the current theme settings used in the Telegram app.
     */
    themeParams: ThemeParams;
    /**
     * _True_, if the Web App is expanded to the maximum available height. False, if the Web App occupies part of the screen and can be expanded to the full height using the **expand()** method.
     */
    isExpanded: boolean;
    /**
     * The current height of the visible area of the Web App. Also available in CSS as the variable `var(--tg-viewport-height)`.
     * 
     * The application can display just the top part of the Web App, with its lower part remaining outside the screen area. From this position, the user can “pull” the Web App to its maximum height, while the bot can do the same by calling the **expand()** method. As the position of the Web App changes, the current height value of the visible area will be updated in real time.  
     * 
     * Please note that the refresh rate of this value is not sufficient to smoothly follow the lower border of the window. It should not be used to pin interface elements to the bottom of the visible area. It's more appropriate to use the value of the `viewportStableHeight` field for this purpose.
     */
    viewportHeight: number;
    /**
     * The height of the visible area of the Web App in its last stable state. Also available in CSS as a variable `var(--tg-viewport-stable-height)`.  
     * 
     * The application can display just the top part of the Web App, with its lower part remaining outside the screen area. From this position, the user can “pull” the Web App to its maximum height, while the bot can do the same by calling the **expand()** method. Unlike the value of `viewportHeight`, the value of `viewportStableHeight` does not change as the position of the Web App changes with user gestures or during animations. The value of `viewportStableHeight` will be updated after all gestures and animations are completed and the Web App reaches its final size.  
     * 
     * _Note the [event](https://core.telegram.org/bots/webapps#events-available-for-web-apps) `viewportChanged` with the passed parameter `isStateStable=true`, which will allow you to track when the stable state of the height of the visible area changes._
     */
    viewportStableHeight: number;
    /**
     * Current header color in the `#RRGGBB` format.
     */
    headerColor: HexColor;
    /**
     * Current background color in the `#RRGGBB` format.
     */
    backgroundColor: HexColor;
    /**
     * _True_, if the confirmation dialog is enabled while the user is trying to close the Web App. _False_, if the confirmation dialog is disabled.
     */
    isClosingConfirmationEnabled: boolean;
    /**
     * An object for controlling the back button which can be displayed in the header of the Web App in the Telegram interface.
     */
    BackButton: BackButton;
    /**
     * An object for controlling the main button, which is displayed at the bottom of the Web App in the Telegram interface.
     */
    MainButton: MainButton;
    /**
     * An object for controlling haptic feedback.
     */
    HapticFeedback: HapticFeedback;
    /**
     * Returns true if the user's app supports a version of the Bot API that is equal to or higher than the version passed as the parameter.
     */
    isVerionAtLeast(version: string): void;
    /**
     * A method that sets the app header color. You can only pass _Telegram.WebApp.themeParams.bg\_color_ or _Telegram.WebApp.themeParams.secondary\_bg\_color_ as a color or you can use keywords _bg\_color_, _secondary\_bg\_color_ instead.
     */
    setHeaderColor(color: 'bg_color' | 'secondary_bg_color' | HexColor): void;
    /**
     * A method that sets the app background color in the `#RRGGBB` format or you can use keywords _bg\_color_, _secondary\_bg\_color_ instead.
     */
    setBackgroundColor(color: 'bg_color' | 'secondary_bg_color' | HexColor): void;
    /**
     * A method that enables a confirmation dialog while the user is trying to close the Web App.
     */
    enableClosingConfirmation(): void;
    /**
     * A method that disables the confirmation dialog while the user is trying to close the Web App.
     */
    disableClosingConfirmation(): void;
    /**
     * A method that sets the app event handler. Check [the list of available events](https://core.telegram.org/bots/webapps#events-available-for-web-apps).
     */
    onEvent<Type extends EventType>(eventType: Type, eventHandler: (params: EventHandlerParams[Type]) => void): void;
    /**
     * A method that deletes a previously set event handler.
     */
    offEvent<Type extends EventType>(eventType: Type, eventHandler: (params: EventHandlerParams[Type]) => void): void;
    /**
     * A method used to send data to the bot. When this method is called, a service message is sent to the bot containing the data _data_ of the length up to 4096 bytes, and the Web App is closed. See the field _web\_app\_data_ in the class [Message](/bots/api#message).  
     *
     * _This method is only available for Web Apps launched via a [Keyboard button](https://core.telegram.org/bots/webapps#keyboard-button-web-apps)._
     */
    sendData(data: any): void;
    /**
     * A method that inserts the bot's username and the specified inline _query_ in the current chat's input field. Query may be empty, in which case only the bot's username will be inserted. If an optional _choose\_chat\_types_ parameter was passed, the client prompts the user to choose a specific chat, then opens that chat and inserts the bot's username and the specified inline query in the input field. You can specify which types of chats the user will be able to choose from. It can be one or more of the following types: _users_, _bots_, _groups_, _channels_.
     */
    switchInlineQuery(query: string, choose_chat_types?: ('users' | 'bots' | 'groups' | 'channels')[]): void;
    /**
     * A method that opens a link in an external browser. The Web App will _not_ be closed.  
     *
     * If the optional _options_ parameter is passed with the field _try\_instant\_view=true_, the link will be opened in [Instant View](https://instantview.telegram.org/) mode if possible.  
     *
     * _Note that this method can be called only in response to user interaction with the Web App interface (e.g. a click inside the Web App or on the main button)_
     */
    openLink(url: string, options?: { try_instant_view: boolean }): void;
    /**
     * A method that opens a telegram link inside Telegram app. The Web App _will_ be closed.
     */
    openTelegramLink(url: string): void;
    /**
     * A method that opens an invoice using the link _url_. The Web App will receive the [event](https://core.telegram.org/bots/webapps#events-available-for-web-apps) _invoiceClosed_ when the invoice is closed. If an optional _callback_ parameter was passed, the _callback_ function will be called and the invoice status will be passed as the first argument.
     */
    openInvoice(url: string, callback?: ( status: InvoiceStatus ) => void): void;
    /**
     * A method that shows a native popup described by the _params_ argument of the type [PopupParams](https://core.telegram.org/bots/webapps#popupparams). The Web App will receive the [event](https://core.telegram.org/bots/webapps#events-available-for-web-apps) _popupClosed_ when the popup is closed. If an optional _callback_ parameter was passed, the _callback_ function will be called and the field _id_ of the pressed button will be passed as the first argument.
     */
    showPopup(params: PopupParams, callback?: (id: PopupButton['id']) => void): void;
    /**
     * Bot API 6.2+ A method that shows _message_ in a simple alert with a 'Close' button. If an optional _callback_ parameter was passed, the _callback_ function will be called when the popup is closed.
     */
    showAlert(message: string, callback?: () => void): void;
    /**
     * A method that shows _message_ in a simple confirmation window with 'OK' and 'Cancel' buttons. If an optional _callback_ parameter was passed, the _callback_ function will be called when the popup is closed and the first argument will be a boolean indicating whether the user pressed the 'OK' button.
     */
    showConfirm(message: string, callback?: (pressedOK: boolean) => void): void;
    /**
     * A method that shows a native popup for scanning a QR code described by the _params_ argument of the type [ScanQrPopupParams](https://core.telegram.org/bots/webapps#scanqrpopupparams). The Web App will receive the [event](https://core.telegram.org/bots/webapps#events-available-for-web-apps) _qrTextReceived_ every time the scanner catches a code with text data. If an optional _callback_ parameter was passed, the _callback_ function will be called and the text from the QR code will be passed as the first argument. Returning _true_ inside this callback function causes the popup to be closed.
     */
    showScanQrPopup(params: ScanQrPopupParams, callback?: (data: string) => void | true): void;
    /**
     * A method that closes the native popup for scanning a QR code opened with the _showScanQrPopup_ method. Run it if you received valid data in the [event](https://core.telegram.org/bots/webapps#events-available-for-web-apps) _qrTextReceived_.
     */
    closeScanQrPopup(): void;
    /**
     * A method that requests text from the clipboard. The Web App will receive the [event](https://core.telegram.org/bots/webapps#events-available-for-web-apps) _clipboardTextReceived_. If an optional _callback_ parameter was passed, the _callback_ function will be called and the text from the clipboard will be passed as the first argument.  
     *
     * _Note: this method can be called only for Web Apps launched from the attachment menu and only in response to a user interaction with the Web App interface (e.g. a click inside the Web App or on the main button)._
     */
    readTextFromClipboard(callback?: (data: string) => void): void;
    /**
     * A method that informs the Telegram app that the Web App is ready to be displayed.  
     *
     * It is recommended to call this method as early as possible, as soon as all essential interface elements are loaded. Once this method is called, the loading placeholder is hidden and the Web App is shown.  
     *
     * If the method is not called, the placeholder will be hidden only when the page is fully loaded.
     */
    ready(): void;
    /**
     * A method that expands the Web App to the maximum available height. To find out if the Web App is expanded to the maximum height, refer to the value of the _Telegram.WebApp.isExpanded_ parameter
     */
    expand(): void;
    /**
     * A method that closes the Web App.
     */
    close(): void;
}

interface Telegram {
    WebApp: WebApp
}

declare var Telegram: Telegram;