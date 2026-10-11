/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import rateLimit from 'express-rate-limit';
import {LoginRequestDTO} from '@copor/core/client/Login/Login/dto/LoginRequestDTO';
import express, {Request} from 'express';

export const publicLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	message: {error: 'Too many requests, please try again later.'},
	standardHeaders: true,
	legacyHeaders: false
});

export const loginLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 12,
	keyGenerator: (req: Request<{}, {}, LoginRequestDTO>) => {
		return `login-${req.body.username.toLowerCase().trim()}`;
	},
	skip: (req: Request<{}, {}, LoginRequestDTO>) => !req.body?.username,
	message: {error: 'Too many login attempts, please try again later.'},
	standardHeaders: true,
	legacyHeaders: false
});