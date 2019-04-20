import React from 'react';
import { useContext } from "react";
import { Icontext } from "./App";
import { Activity } from "../../";

export const Icon = () => {
    const context = useContext(Icontext);
    return <Activity {...context}/>
}