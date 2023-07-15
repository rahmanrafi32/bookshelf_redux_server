import express from 'express';

export type routesMap = {
  path: string;
  route: express.Router;
};
