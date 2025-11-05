export enum WaitForSelectorStates{
    VISIBLE = 'visible',
    ATTACHED = 'attached'
}

export enum WaitForEventStates{
    CLOSE = "close",
    CONSOLE = "console",
    CRASH = "crash",
    DIALOG = "dialog",
    DOM_CONTENT_LOADED = "domcontentloaded",
    DOWNLOAD = "download",
    FILE_CHOOSER = "filechooser",
    FRAME_ATTACHED = "frameattached",
    FRAME_DETACHED = "framedetached",
    FRAME_NAVIGATED = "framenavigated",
    LOAD = "load",
    PAGE_ERROR = "pageerror",
    POPUP = "popup",
    REQUEST = "request",
    REQUEST_FAILED = "requestfailed",
    REQUEST_FINISHED = "requestfinished",
    RESPONSE = "response",
    WEBSOCKET = "websocker",
    WORKER = "worker"
}

export enum WaitForLoadStates{
    DOM_CONTENT_LOADED = "domcontentloaded",
    LOAD = "load",
    NETWORK_IDLE = "networkidle"
}
