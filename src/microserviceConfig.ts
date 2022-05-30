import {KafkaOptions, Transport} from "@nestjs/microservices";

export const microserviceConfig: KafkaOptions = {
    transport: Transport.KAFKA,

    options: {
        client: {
            brokers: ["localhost:29092"],
        },
        consumer: {
            groupId: '1',
            allowAutoTopicCreation: true,
        },
    }
};