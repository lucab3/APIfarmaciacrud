var express = require('express');
var router = express.Router();
let routescontroller = require('../controllers/routesController');

/**
 * @swagger
 * /api:
 *   get:
 *     description: Obtiene la ubicación por IP y redirecciona a la farmacia más cercana
 *     responses:
 *       302:
 *         description: Redirecciona a la API de farmacia más cercana
 */
router.get('/', routescontroller.index);

/**
 * @swagger
 * /api/farmacias:
 *   get:
 *     description: Obtiene todas las farmacias
 *     responses:
 *       200:
 *         description: Lista de todas las farmacias
 */
router.get('/farmacias', routescontroller.listarFarmacias);

/**
 * @swagger
 * /api/farmacia:
 *   get:
 *     description: Obtiene la farmacia más cercana según coordenadas
 *     parameters:
 *       - name: lat
 *         in: query
 *         required: true
 *         description: Latitud del cliente
 *         schema:
 *           type: number
 *       - name: lon
 *         in: query
 *         required: true
 *         description: Longitud del cliente
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Farmacia más cercana encontrada
 */
router.get("/farmacia", routescontroller.negociocercano);

/**
 * @swagger
 * /api/farmacia/{id}:
 *   get:
 *     description: Obtiene una farmacia por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la farmacia
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Farmacia encontrada
 *       404:
 *         description: Farmacia no encontrada
 */
router.get("/farmacia/:id", routescontroller.obtenerFarmacia);

/**
 * @swagger
 * /api/farmacia:
 *   post:
 *     description: Crea una nueva farmacia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               ubicacion:
 *                 type: string
 *               latitud:
 *                 type: number
 *               longitud:
 *                 type: number
 *     responses:
 *       201:
 *         description: Farmacia creada exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/farmacia", routescontroller.guardado);

/**
 * @swagger
 * /api/farmacia/{id}:
 *   put:
 *     description: Actualiza una farmacia existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la farmacia
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               ubicacion:
 *                 type: string
 *               latitud:
 *                 type: number
 *               longitud:
 *                 type: number
 *     responses:
 *       200:
 *         description: Farmacia actualizada exitosamente
 *       404:
 *         description: Farmacia no encontrada
 */
router.put("/farmacia/:id", routescontroller.actualizar);

/**
 * @swagger
 * /api/farmacia/{id}:
 *   delete:
 *     description: Elimina una farmacia
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la farmacia
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Farmacia eliminada exitosamente
 *       404:
 *         description: Farmacia no encontrada
 */
router.delete("/farmacia/:id", routescontroller.eliminar);

module.exports = router;
