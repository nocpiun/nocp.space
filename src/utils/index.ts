import type React from "react";

export function getElemById<T extends HTMLElement>(id: string): T {
    return document.getElementById(id) as T ?? document.body;
}

export function optional<T>(value: T, empty: T, exp?: boolean): T {
    return exp || exp === undefined ? value : empty;
}

export function getCurrentState<S>(setState: React.Dispatch<React.SetStateAction<S>>): Promise<S> {
    return new Promise((resolve, reject) => {
        setState((current) => {
            resolve(current);
            return current;
        });
    });
}

export function arrayRemove<T = any>(oldArray: T[], index: number): T[] {
    if(index < 0 || index >= oldArray.length) return [];
    var newArray = oldArray;

    var j = index;
    while(j < newArray.length) {
        newArray[j] = newArray[j + 1];
        j++;
    }
    newArray.pop();

    return newArray;
}

export function arrayPut<T = any>(oldArray: T[], index: number, item: T): T[] {
    if(index < 0 || index >= oldArray.length + 1) return [];
    var newArray = oldArray;

    newArray.splice(index, 0, item);
    return newArray;
}
