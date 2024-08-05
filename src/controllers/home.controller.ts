import { Request, Response } from 'express';

function renderHomePage(req: Request, res: Response) {
  res.render('index.ejs');
}

export { renderHomePage };
