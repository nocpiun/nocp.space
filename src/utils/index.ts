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
