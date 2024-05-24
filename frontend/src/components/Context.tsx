"use client";

import { createContext, useState } from "react";

type TimeContextType = [
	number,
	React.Dispatch<React.SetStateAction<number>>?,
	boolean?,
	React.Dispatch<React.SetStateAction<boolean>>?,
];

const TimeContext = createContext<TimeContextType>([0]);

export default TimeContext;
