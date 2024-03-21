declare class serverData {
    requestStatus: REQUEST_STATUS;
    studioName: string;
    projectName: string;
    constructor(requestStatus: REQUEST_STATUS, studioName: string, projectName: string);
}
declare enum REQUEST_STATUS {
    UP = 0,
    BROKEN = 1,
    DOWN = 2
}
export { serverData, REQUEST_STATUS };
//# sourceMappingURL=serverData.types.d.ts.map