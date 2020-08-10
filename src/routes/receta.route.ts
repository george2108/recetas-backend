import { Router } from 'express';
import { Request, Response } from 'express';
import path from 'path';
import pool from '../database';
import fs from 'fs';
import uniqid from 'uniqid'

class RecetasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.post('/pdf', async (req: Request, res: Response) => {

            try {
                const unico = uniqid();
                console.log('id del pdf: ', unico);
                const query = `insert into recetas values(default, '${ req.body.nombre }', '${ unico }', current_date())`
                await pool.query(query);
                const pat = path.resolve(__dirname, '../', 'pdfs');
                fs.writeFile(pat + `/${ unico }.pdf`, req.body.pdf, {encoding: 'base64'}, function(err) {
                    res.json({
                        ok: true,
                        mensaje: 'Archivo guardado correctamente',
                        uuid: unico
                    });
                });
            }
            catch(e) {
                res.json({
                    ok: false,
                    mensaje: 'Error al conectar con la base de datos',
                    error: e
                })
            }
            
        });


        this.router.get('/buscar/:termino', async (req: Request, res: Response) => {
            const { termino } = req.params;
            const query = `select * FROM recetas where nombre LIKE '%${ termino }%' order by nombre`
            const resultados = await pool.query(query);
            res.json(resultados);
        });


        this.router.get('/devolver/:uuid', async (req: Request, res: Response) => {
            const { uuid } = req.params;
            const name = `${ uuid }.pdf`;
            const pathPdf = path.resolve(__dirname, '../pdfs', name);
            res.json(pathPdf);
        });
    }

}

const recetasRoutes = new RecetasRoutes();

export default recetasRoutes.router;
