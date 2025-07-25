/**
 * @swagger
 * tags:
 *   - name: Items
 *     description: Endpoints para gestionar items (CRUD)
 */
import express from 'express';
import Item from '../models/itemModel.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/items:
 *   get:
 *     tags: [Items]
 *     summary: Obtener todos los items
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de items
 */
router.get('/', authMiddleware, async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

/**
 * @swagger
 * /api/items:
 *   post:
 *     tags: [Items]
 *     summary: Crear un nuevo item
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Item creado
 */
router.post('/', authMiddleware, async (req, res) => {
  const item = await Item.create(req.body);
  res.status(201).json(item);
});

/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     tags: [Items]
 *     summary: Obtener un item por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item encontrado
 *       404:
 *         description: Item no encontrado
 */
router.get('/:id', authMiddleware, async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Item no encontrado' });
  res.json(item);
});

/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *     tags: [Items]
 *     summary: Actualizar un item por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Item actualizado
 *       404:
 *         description: Item no encontrado
 */
router.put('/:id', authMiddleware, async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ error: 'Item no encontrado' });
  res.json(item);
});

/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     tags: [Items]
 *     summary: Eliminar un item por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item eliminado
 *       404:
 *         description: Item no encontrado
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  const item = await Item.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: 'Item no encontrado' });
  res.json({ message: 'Item eliminado' });
});

export default router; 