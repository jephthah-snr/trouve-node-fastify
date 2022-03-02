import { FastifyPluginAsync } from "fastify";
import authMiddleware from "../../v1/middlewares/authMiddleware";
import routePrefix from "../../configurations/routePrefix";
import DeliveryController from "@v1/controllers/DeliveryController";

const deliveryRoute: FastifyPluginAsync = async (fastify: any, opts): Promise<void> => {

    const deliveryController = new DeliveryController();

    fastify.route({
        method: "POST",
        url: `${routePrefix.deliveryRouteV1}/create`,
        preHandler: [authMiddleware],
        handler: deliveryController.saveDelivery,
    });

    fastify.route({
        method: "GET",
        url: `${routePrefix.deliveryRouteV1}/all`,
        preHandler: [authMiddleware],
        handler: deliveryController.fetchAllDelivery,
    });

    fastify.route({
        method: "GET",
        url: `${routePrefix.deliveryRouteV1}/single/:id`,
        preHandler: [authMiddleware],
        handler: deliveryController.singleDelivery,
    });
};

export default deliveryRoute;