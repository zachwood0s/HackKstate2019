import {Router, Request, Response} from 'express';
import * as path from 'path';
// Assign router to the express.Router() instance
const router: Router = Router();

// The / here corresponds to the route that the WelcomeController
// is mounted on in the server.ts file.
// In this case it's /welcome
router.get('/desktop', (req: Request, res: Response) => {
    // Reply with a hello world when no name param is provided
    res.sendFile(path.resolve(__dirname + "../../../../views/desktopIndex.html"));
});

router.get('/mobile', (req: Request, res: Response) => {
    // Reply with a hello world when no name param is provided
    res.sendFile(path.resolve(__dirname + "../../../../views/mobileIndex.html"));
});

// Export the express.Router() instance to be used by server.ts
export const PageController: Router = router;


