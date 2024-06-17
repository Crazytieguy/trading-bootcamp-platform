import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace websocket_api. */
export namespace websocket_api {

    /** Namespace server. */
    namespace server {

        /** Properties of a ServerMessage. */
        interface IServerMessage {

            /** ServerMessage portfolioState */
            portfolioState?: (websocket_api.server.IPortfolio|null);

            /** ServerMessage marketState */
            marketState?: (websocket_api.server.IMarket|null);

            /** ServerMessage marketCreated */
            marketCreated?: (websocket_api.server.IMarket|null);

            /** ServerMessage marketSettled */
            marketSettled?: (websocket_api.server.IMarketSettled|null);

            /** ServerMessage orderCreated */
            orderCreated?: (websocket_api.server.IOrder|null);

            /** ServerMessage orderCancelled */
            orderCancelled?: (websocket_api.server.IOrderCancelled|null);

            /** ServerMessage orderFilled */
            orderFilled?: (websocket_api.server.IOrderFilled|null);

            /** ServerMessage tradeExecuted */
            tradeExecuted?: (websocket_api.server.ITrade|null);

            /** ServerMessage requestFailed */
            requestFailed?: (websocket_api.server.IRequestFailed|null);
        }

        /** Represents a ServerMessage. */
        class ServerMessage implements IServerMessage {

            /**
             * Constructs a new ServerMessage.
             * @param [properties] Properties to set
             */
            constructor(properties?: websocket_api.server.IServerMessage);

            /** ServerMessage portfolioState. */
            public portfolioState?: (websocket_api.server.IPortfolio|null);

            /** ServerMessage marketState. */
            public marketState?: (websocket_api.server.IMarket|null);

            /** ServerMessage marketCreated. */
            public marketCreated?: (websocket_api.server.IMarket|null);

            /** ServerMessage marketSettled. */
            public marketSettled?: (websocket_api.server.IMarketSettled|null);

            /** ServerMessage orderCreated. */
            public orderCreated?: (websocket_api.server.IOrder|null);

            /** ServerMessage orderCancelled. */
            public orderCancelled?: (websocket_api.server.IOrderCancelled|null);

            /** ServerMessage orderFilled. */
            public orderFilled?: (websocket_api.server.IOrderFilled|null);

            /** ServerMessage tradeExecuted. */
            public tradeExecuted?: (websocket_api.server.ITrade|null);

            /** ServerMessage requestFailed. */
            public requestFailed?: (websocket_api.server.IRequestFailed|null);

            /** ServerMessage message. */
            public message?: ("portfolioState"|"marketState"|"marketCreated"|"marketSettled"|"orderCreated"|"orderCancelled"|"orderFilled"|"tradeExecuted"|"requestFailed");

            /**
             * Creates a new ServerMessage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ServerMessage instance
             */
            public static create(properties?: websocket_api.server.IServerMessage): websocket_api.server.ServerMessage;

            /**
             * Encodes the specified ServerMessage message. Does not implicitly {@link websocket_api.server.ServerMessage.verify|verify} messages.
             * @param message ServerMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: websocket_api.server.IServerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ServerMessage message, length delimited. Does not implicitly {@link websocket_api.server.ServerMessage.verify|verify} messages.
             * @param message ServerMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: websocket_api.server.IServerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ServerMessage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ServerMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): websocket_api.server.ServerMessage;

            /**
             * Decodes a ServerMessage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ServerMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): websocket_api.server.ServerMessage;

            /**
             * Verifies a ServerMessage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ServerMessage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ServerMessage
             */
            public static fromObject(object: { [k: string]: any }): websocket_api.server.ServerMessage;

            /**
             * Creates a plain object from a ServerMessage message. Also converts values to other types if specified.
             * @param message ServerMessage
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: websocket_api.server.ServerMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ServerMessage to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ServerMessage
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Portfolio. */
        interface IPortfolio {

            /** Portfolio totalBalance */
            totalBalance?: (string|null);

            /** Portfolio availableBalance */
            availableBalance?: (string|null);

            /** Portfolio marketExposures */
            marketExposures?: (websocket_api.server.Portfolio.IMarketExposure[]|null);
        }

        /** Represents a Portfolio. */
        class Portfolio implements IPortfolio {

            /**
             * Constructs a new Portfolio.
             * @param [properties] Properties to set
             */
            constructor(properties?: websocket_api.server.IPortfolio);

            /** Portfolio totalBalance. */
            public totalBalance: string;

            /** Portfolio availableBalance. */
            public availableBalance: string;

            /** Portfolio marketExposures. */
            public marketExposures: websocket_api.server.Portfolio.IMarketExposure[];

            /**
             * Creates a new Portfolio instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Portfolio instance
             */
            public static create(properties?: websocket_api.server.IPortfolio): websocket_api.server.Portfolio;

            /**
             * Encodes the specified Portfolio message. Does not implicitly {@link websocket_api.server.Portfolio.verify|verify} messages.
             * @param message Portfolio message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: websocket_api.server.IPortfolio, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Portfolio message, length delimited. Does not implicitly {@link websocket_api.server.Portfolio.verify|verify} messages.
             * @param message Portfolio message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: websocket_api.server.IPortfolio, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Portfolio message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Portfolio
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): websocket_api.server.Portfolio;

            /**
             * Decodes a Portfolio message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Portfolio
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): websocket_api.server.Portfolio;

            /**
             * Verifies a Portfolio message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Portfolio message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Portfolio
             */
            public static fromObject(object: { [k: string]: any }): websocket_api.server.Portfolio;

            /**
             * Creates a plain object from a Portfolio message. Also converts values to other types if specified.
             * @param message Portfolio
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: websocket_api.server.Portfolio, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Portfolio to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Portfolio
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace Portfolio {

            /** Properties of a MarketExposure. */
            interface IMarketExposure {

                /** MarketExposure marketId */
                marketId?: (string|null);

                /** MarketExposure position */
                position?: (string|null);

                /** MarketExposure orders */
                orders?: (number|null);
            }

            /** Represents a MarketExposure. */
            class MarketExposure implements IMarketExposure {

                /**
                 * Constructs a new MarketExposure.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: websocket_api.server.Portfolio.IMarketExposure);

                /** MarketExposure marketId. */
                public marketId: string;

                /** MarketExposure position. */
                public position: string;

                /** MarketExposure orders. */
                public orders: number;

                /**
                 * Creates a new MarketExposure instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns MarketExposure instance
                 */
                public static create(properties?: websocket_api.server.Portfolio.IMarketExposure): websocket_api.server.Portfolio.MarketExposure;

                /**
                 * Encodes the specified MarketExposure message. Does not implicitly {@link websocket_api.server.Portfolio.MarketExposure.verify|verify} messages.
                 * @param message MarketExposure message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: websocket_api.server.Portfolio.IMarketExposure, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified MarketExposure message, length delimited. Does not implicitly {@link websocket_api.server.Portfolio.MarketExposure.verify|verify} messages.
                 * @param message MarketExposure message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: websocket_api.server.Portfolio.IMarketExposure, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a MarketExposure message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns MarketExposure
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): websocket_api.server.Portfolio.MarketExposure;

                /**
                 * Decodes a MarketExposure message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns MarketExposure
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): websocket_api.server.Portfolio.MarketExposure;

                /**
                 * Verifies a MarketExposure message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a MarketExposure message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns MarketExposure
                 */
                public static fromObject(object: { [k: string]: any }): websocket_api.server.Portfolio.MarketExposure;

                /**
                 * Creates a plain object from a MarketExposure message. Also converts values to other types if specified.
                 * @param message MarketExposure
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: websocket_api.server.Portfolio.MarketExposure, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this MarketExposure to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for MarketExposure
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        /** Properties of a Market. */
        interface IMarket {

            /** Market id */
            id?: (string|null);

            /** Market name */
            name?: (string|null);

            /** Market description */
            description?: (string|null);

            /** Market ownerId */
            ownerId?: (string|null);

            /** Market minSettlement */
            minSettlement?: (string|null);

            /** Market maxSettlement */
            maxSettlement?: (string|null);

            /** Market open */
            open?: (websocket_api.server.Market.IOpen|null);

            /** Market closed */
            closed?: (websocket_api.server.Market.IClosed|null);

            /** Market state */
            state?: (websocket_api.server.Market.IState|null);
        }

        /** Represents a Market. */
        class Market implements IMarket {

            /**
             * Constructs a new Market.
             * @param [properties] Properties to set
             */
            constructor(properties?: websocket_api.server.IMarket);

            /** Market id. */
            public id: string;

            /** Market name. */
            public name: string;

            /** Market description. */
            public description: string;

            /** Market ownerId. */
            public ownerId: string;

            /** Market minSettlement. */
            public minSettlement: string;

            /** Market maxSettlement. */
            public maxSettlement: string;

            /** Market open. */
            public open?: (websocket_api.server.Market.IOpen|null);

            /** Market closed. */
            public closed?: (websocket_api.server.Market.IClosed|null);

            /** Market state. */
            public state?: (websocket_api.server.Market.IState|null);

            /** Market status. */
            public status?: ("open"|"closed");

            /** Market _state. */
            public _state?: "state";

            /**
             * Creates a new Market instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Market instance
             */
            public static create(properties?: websocket_api.server.IMarket): websocket_api.server.Market;

            /**
             * Encodes the specified Market message. Does not implicitly {@link websocket_api.server.Market.verify|verify} messages.
             * @param message Market message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: websocket_api.server.IMarket, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Market message, length delimited. Does not implicitly {@link websocket_api.server.Market.verify|verify} messages.
             * @param message Market message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: websocket_api.server.IMarket, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Market message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Market
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): websocket_api.server.Market;

            /**
             * Decodes a Market message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Market
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): websocket_api.server.Market;

            /**
             * Verifies a Market message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Market message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Market
             */
            public static fromObject(object: { [k: string]: any }): websocket_api.server.Market;

            /**
             * Creates a plain object from a Market message. Also converts values to other types if specified.
             * @param message Market
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: websocket_api.server.Market, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Market to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Market
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace Market {

            /** Properties of a State. */
            interface IState {

                /** State tradeHistory */
                tradeHistory?: (websocket_api.server.ITrade[]|null);

                /** State openOrders */
                openOrders?: (websocket_api.server.IOrder[]|null);
            }

            /** Represents a State. */
            class State implements IState {

                /**
                 * Constructs a new State.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: websocket_api.server.Market.IState);

                /** State tradeHistory. */
                public tradeHistory: websocket_api.server.ITrade[];

                /** State openOrders. */
                public openOrders: websocket_api.server.IOrder[];

                /**
                 * Creates a new State instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns State instance
                 */
                public static create(properties?: websocket_api.server.Market.IState): websocket_api.server.Market.State;

                /**
                 * Encodes the specified State message. Does not implicitly {@link websocket_api.server.Market.State.verify|verify} messages.
                 * @param message State message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: websocket_api.server.Market.IState, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified State message, length delimited. Does not implicitly {@link websocket_api.server.Market.State.verify|verify} messages.
                 * @param message State message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: websocket_api.server.Market.IState, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a State message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns State
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): websocket_api.server.Market.State;

                /**
                 * Decodes a State message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns State
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): websocket_api.server.Market.State;

                /**
                 * Verifies a State message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a State message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns State
                 */
                public static fromObject(object: { [k: string]: any }): websocket_api.server.Market.State;

                /**
                 * Creates a plain object from a State message. Also converts values to other types if specified.
                 * @param message State
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: websocket_api.server.Market.State, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this State to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for State
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an Open. */
            interface IOpen {
            }

            /** Represents an Open. */
            class Open implements IOpen {

                /**
                 * Constructs a new Open.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: websocket_api.server.Market.IOpen);

                /**
                 * Creates a new Open instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Open instance
                 */
                public static create(properties?: websocket_api.server.Market.IOpen): websocket_api.server.Market.Open;

                /**
                 * Encodes the specified Open message. Does not implicitly {@link websocket_api.server.Market.Open.verify|verify} messages.
                 * @param message Open message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: websocket_api.server.Market.IOpen, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Open message, length delimited. Does not implicitly {@link websocket_api.server.Market.Open.verify|verify} messages.
                 * @param message Open message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: websocket_api.server.Market.IOpen, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an Open message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Open
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): websocket_api.server.Market.Open;

                /**
                 * Decodes an Open message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Open
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): websocket_api.server.Market.Open;

                /**
                 * Verifies an Open message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an Open message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Open
                 */
                public static fromObject(object: { [k: string]: any }): websocket_api.server.Market.Open;

                /**
                 * Creates a plain object from an Open message. Also converts values to other types if specified.
                 * @param message Open
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: websocket_api.server.Market.Open, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Open to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Open
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a Closed. */
            interface IClosed {

                /** Closed settlePrice */
                settlePrice?: (string|null);
            }

            /** Represents a Closed. */
            class Closed implements IClosed {

                /**
                 * Constructs a new Closed.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: websocket_api.server.Market.IClosed);

                /** Closed settlePrice. */
                public settlePrice: string;

                /**
                 * Creates a new Closed instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Closed instance
                 */
                public static create(properties?: websocket_api.server.Market.IClosed): websocket_api.server.Market.Closed;

                /**
                 * Encodes the specified Closed message. Does not implicitly {@link websocket_api.server.Market.Closed.verify|verify} messages.
                 * @param message Closed message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: websocket_api.server.Market.IClosed, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Closed message, length delimited. Does not implicitly {@link websocket_api.server.Market.Closed.verify|verify} messages.
                 * @param message Closed message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: websocket_api.server.Market.IClosed, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Closed message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Closed
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): websocket_api.server.Market.Closed;

                /**
                 * Decodes a Closed message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Closed
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): websocket_api.server.Market.Closed;

                /**
                 * Verifies a Closed message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Closed message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Closed
                 */
                public static fromObject(object: { [k: string]: any }): websocket_api.server.Market.Closed;

                /**
                 * Creates a plain object from a Closed message. Also converts values to other types if specified.
                 * @param message Closed
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: websocket_api.server.Market.Closed, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Closed to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Closed
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        /** Properties of a Trade. */
        interface ITrade {

            /** Trade marketId */
            marketId?: (string|null);

            /** Trade timestamp */
            timestamp?: (google.protobuf.ITimestamp|null);

            /** Trade price */
            price?: (string|null);

            /** Trade size */
            size?: (string|null);

            /** Trade buyer */
            buyer?: (string|null);

            /** Trade seller */
            seller?: (string|null);
        }

        /** Represents a Trade. */
        class Trade implements ITrade {

            /**
             * Constructs a new Trade.
             * @param [properties] Properties to set
             */
            constructor(properties?: websocket_api.server.ITrade);

            /** Trade marketId. */
            public marketId: string;

            /** Trade timestamp. */
            public timestamp?: (google.protobuf.ITimestamp|null);

            /** Trade price. */
            public price: string;

            /** Trade size. */
            public size: string;

            /** Trade buyer. */
            public buyer: string;

            /** Trade seller. */
            public seller: string;

            /**
             * Creates a new Trade instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Trade instance
             */
            public static create(properties?: websocket_api.server.ITrade): websocket_api.server.Trade;

            /**
             * Encodes the specified Trade message. Does not implicitly {@link websocket_api.server.Trade.verify|verify} messages.
             * @param message Trade message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: websocket_api.server.ITrade, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Trade message, length delimited. Does not implicitly {@link websocket_api.server.Trade.verify|verify} messages.
             * @param message Trade message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: websocket_api.server.ITrade, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Trade message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Trade
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): websocket_api.server.Trade;

            /**
             * Decodes a Trade message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Trade
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): websocket_api.server.Trade;

            /**
             * Verifies a Trade message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Trade message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Trade
             */
            public static fromObject(object: { [k: string]: any }): websocket_api.server.Trade;

            /**
             * Creates a plain object from a Trade message. Also converts values to other types if specified.
             * @param message Trade
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: websocket_api.server.Trade, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Trade to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Trade
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an Order. */
        interface IOrder {

            /** Order id */
            id?: (string|null);

            /** Order marketId */
            marketId?: (string|null);

            /** Order ownerId */
            ownerId?: (string|null);

            /** Order createdAt */
            createdAt?: (google.protobuf.ITimestamp|null);

            /** Order price */
            price?: (string|null);

            /** Order size */
            size?: (string|null);

            /** Order side */
            side?: (websocket_api.server.Order.Side|null);
        }

        /** Represents an Order. */
        class Order implements IOrder {

            /**
             * Constructs a new Order.
             * @param [properties] Properties to set
             */
            constructor(properties?: websocket_api.server.IOrder);

            /** Order id. */
            public id: string;

            /** Order marketId. */
            public marketId: string;

            /** Order ownerId. */
            public ownerId: string;

            /** Order createdAt. */
            public createdAt?: (google.protobuf.ITimestamp|null);

            /** Order price. */
            public price: string;

            /** Order size. */
            public size: string;

            /** Order side. */
            public side: websocket_api.server.Order.Side;

            /**
             * Creates a new Order instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Order instance
             */
            public static create(properties?: websocket_api.server.IOrder): websocket_api.server.Order;

            /**
             * Encodes the specified Order message. Does not implicitly {@link websocket_api.server.Order.verify|verify} messages.
             * @param message Order message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: websocket_api.server.IOrder, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Order message, length delimited. Does not implicitly {@link websocket_api.server.Order.verify|verify} messages.
             * @param message Order message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: websocket_api.server.IOrder, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Order message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Order
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): websocket_api.server.Order;

            /**
             * Decodes an Order message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Order
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): websocket_api.server.Order;

            /**
             * Verifies an Order message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Order message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Order
             */
            public static fromObject(object: { [k: string]: any }): websocket_api.server.Order;

            /**
             * Creates a plain object from an Order message. Also converts values to other types if specified.
             * @param message Order
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: websocket_api.server.Order, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Order to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Order
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace Order {

            /** Side enum. */
            enum Side {
                UNKNOWN = 0,
                BID = 1,
                OFFER = 2
            }
        }

        /** Properties of a MarketSettled. */
        interface IMarketSettled {

            /** MarketSettled id */
            id?: (string|null);

            /** MarketSettled settlePrice */
            settlePrice?: (string|null);
        }

        /** Represents a MarketSettled. */
        class MarketSettled implements IMarketSettled {

            /**
             * Constructs a new MarketSettled.
             * @param [properties] Properties to set
             */
            constructor(properties?: websocket_api.server.IMarketSettled);

            /** MarketSettled id. */
            public id: string;

            /** MarketSettled settlePrice. */
            public settlePrice: string;

            /**
             * Creates a new MarketSettled instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MarketSettled instance
             */
            public static create(properties?: websocket_api.server.IMarketSettled): websocket_api.server.MarketSettled;

            /**
             * Encodes the specified MarketSettled message. Does not implicitly {@link websocket_api.server.MarketSettled.verify|verify} messages.
             * @param message MarketSettled message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: websocket_api.server.IMarketSettled, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MarketSettled message, length delimited. Does not implicitly {@link websocket_api.server.MarketSettled.verify|verify} messages.
             * @param message MarketSettled message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: websocket_api.server.IMarketSettled, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MarketSettled message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MarketSettled
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): websocket_api.server.MarketSettled;

            /**
             * Decodes a MarketSettled message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MarketSettled
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): websocket_api.server.MarketSettled;

            /**
             * Verifies a MarketSettled message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MarketSettled message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MarketSettled
             */
            public static fromObject(object: { [k: string]: any }): websocket_api.server.MarketSettled;

            /**
             * Creates a plain object from a MarketSettled message. Also converts values to other types if specified.
             * @param message MarketSettled
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: websocket_api.server.MarketSettled, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MarketSettled to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for MarketSettled
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an OrderCancelled. */
        interface IOrderCancelled {

            /** OrderCancelled id */
            id?: (string|null);

            /** OrderCancelled marketId */
            marketId?: (string|null);
        }

        /** Represents an OrderCancelled. */
        class OrderCancelled implements IOrderCancelled {

            /**
             * Constructs a new OrderCancelled.
             * @param [properties] Properties to set
             */
            constructor(properties?: websocket_api.server.IOrderCancelled);

            /** OrderCancelled id. */
            public id: string;

            /** OrderCancelled marketId. */
            public marketId: string;

            /**
             * Creates a new OrderCancelled instance using the specified properties.
             * @param [properties] Properties to set
             * @returns OrderCancelled instance
             */
            public static create(properties?: websocket_api.server.IOrderCancelled): websocket_api.server.OrderCancelled;

            /**
             * Encodes the specified OrderCancelled message. Does not implicitly {@link websocket_api.server.OrderCancelled.verify|verify} messages.
             * @param message OrderCancelled message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: websocket_api.server.IOrderCancelled, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified OrderCancelled message, length delimited. Does not implicitly {@link websocket_api.server.OrderCancelled.verify|verify} messages.
             * @param message OrderCancelled message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: websocket_api.server.IOrderCancelled, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an OrderCancelled message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns OrderCancelled
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): websocket_api.server.OrderCancelled;

            /**
             * Decodes an OrderCancelled message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns OrderCancelled
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): websocket_api.server.OrderCancelled;

            /**
             * Verifies an OrderCancelled message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an OrderCancelled message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns OrderCancelled
             */
            public static fromObject(object: { [k: string]: any }): websocket_api.server.OrderCancelled;

            /**
             * Creates a plain object from an OrderCancelled message. Also converts values to other types if specified.
             * @param message OrderCancelled
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: websocket_api.server.OrderCancelled, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this OrderCancelled to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for OrderCancelled
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an OrderFilled. */
        interface IOrderFilled {

            /** OrderFilled id */
            id?: (string|null);

            /** OrderFilled marketId */
            marketId?: (string|null);

            /** OrderFilled full */
            full?: (websocket_api.server.OrderFilled.IFull|null);

            /** OrderFilled partial */
            partial?: (websocket_api.server.OrderFilled.IPartialFillDetails|null);
        }

        /** Represents an OrderFilled. */
        class OrderFilled implements IOrderFilled {

            /**
             * Constructs a new OrderFilled.
             * @param [properties] Properties to set
             */
            constructor(properties?: websocket_api.server.IOrderFilled);

            /** OrderFilled id. */
            public id: string;

            /** OrderFilled marketId. */
            public marketId: string;

            /** OrderFilled full. */
            public full?: (websocket_api.server.OrderFilled.IFull|null);

            /** OrderFilled partial. */
            public partial?: (websocket_api.server.OrderFilled.IPartialFillDetails|null);

            /** OrderFilled fillKind. */
            public fillKind?: ("full"|"partial");

            /**
             * Creates a new OrderFilled instance using the specified properties.
             * @param [properties] Properties to set
             * @returns OrderFilled instance
             */
            public static create(properties?: websocket_api.server.IOrderFilled): websocket_api.server.OrderFilled;

            /**
             * Encodes the specified OrderFilled message. Does not implicitly {@link websocket_api.server.OrderFilled.verify|verify} messages.
             * @param message OrderFilled message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: websocket_api.server.IOrderFilled, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified OrderFilled message, length delimited. Does not implicitly {@link websocket_api.server.OrderFilled.verify|verify} messages.
             * @param message OrderFilled message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: websocket_api.server.IOrderFilled, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an OrderFilled message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns OrderFilled
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): websocket_api.server.OrderFilled;

            /**
             * Decodes an OrderFilled message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns OrderFilled
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): websocket_api.server.OrderFilled;

            /**
             * Verifies an OrderFilled message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an OrderFilled message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns OrderFilled
             */
            public static fromObject(object: { [k: string]: any }): websocket_api.server.OrderFilled;

            /**
             * Creates a plain object from an OrderFilled message. Also converts values to other types if specified.
             * @param message OrderFilled
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: websocket_api.server.OrderFilled, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this OrderFilled to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for OrderFilled
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace OrderFilled {

            /** Properties of a Full. */
            interface IFull {
            }

            /** Represents a Full. */
            class Full implements IFull {

                /**
                 * Constructs a new Full.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: websocket_api.server.OrderFilled.IFull);

                /**
                 * Creates a new Full instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Full instance
                 */
                public static create(properties?: websocket_api.server.OrderFilled.IFull): websocket_api.server.OrderFilled.Full;

                /**
                 * Encodes the specified Full message. Does not implicitly {@link websocket_api.server.OrderFilled.Full.verify|verify} messages.
                 * @param message Full message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: websocket_api.server.OrderFilled.IFull, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Full message, length delimited. Does not implicitly {@link websocket_api.server.OrderFilled.Full.verify|verify} messages.
                 * @param message Full message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: websocket_api.server.OrderFilled.IFull, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Full message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Full
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): websocket_api.server.OrderFilled.Full;

                /**
                 * Decodes a Full message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Full
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): websocket_api.server.OrderFilled.Full;

                /**
                 * Verifies a Full message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Full message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Full
                 */
                public static fromObject(object: { [k: string]: any }): websocket_api.server.OrderFilled.Full;

                /**
                 * Creates a plain object from a Full message. Also converts values to other types if specified.
                 * @param message Full
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: websocket_api.server.OrderFilled.Full, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Full to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Full
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a PartialFillDetails. */
            interface IPartialFillDetails {

                /** PartialFillDetails sizeFilled */
                sizeFilled?: (string|null);

                /** PartialFillDetails sizeRemaining */
                sizeRemaining?: (string|null);
            }

            /** Represents a PartialFillDetails. */
            class PartialFillDetails implements IPartialFillDetails {

                /**
                 * Constructs a new PartialFillDetails.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: websocket_api.server.OrderFilled.IPartialFillDetails);

                /** PartialFillDetails sizeFilled. */
                public sizeFilled: string;

                /** PartialFillDetails sizeRemaining. */
                public sizeRemaining: string;

                /**
                 * Creates a new PartialFillDetails instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PartialFillDetails instance
                 */
                public static create(properties?: websocket_api.server.OrderFilled.IPartialFillDetails): websocket_api.server.OrderFilled.PartialFillDetails;

                /**
                 * Encodes the specified PartialFillDetails message. Does not implicitly {@link websocket_api.server.OrderFilled.PartialFillDetails.verify|verify} messages.
                 * @param message PartialFillDetails message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: websocket_api.server.OrderFilled.IPartialFillDetails, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PartialFillDetails message, length delimited. Does not implicitly {@link websocket_api.server.OrderFilled.PartialFillDetails.verify|verify} messages.
                 * @param message PartialFillDetails message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: websocket_api.server.OrderFilled.IPartialFillDetails, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PartialFillDetails message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PartialFillDetails
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): websocket_api.server.OrderFilled.PartialFillDetails;

                /**
                 * Decodes a PartialFillDetails message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PartialFillDetails
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): websocket_api.server.OrderFilled.PartialFillDetails;

                /**
                 * Verifies a PartialFillDetails message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PartialFillDetails message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PartialFillDetails
                 */
                public static fromObject(object: { [k: string]: any }): websocket_api.server.OrderFilled.PartialFillDetails;

                /**
                 * Creates a plain object from a PartialFillDetails message. Also converts values to other types if specified.
                 * @param message PartialFillDetails
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: websocket_api.server.OrderFilled.PartialFillDetails, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PartialFillDetails to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for PartialFillDetails
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        /** Properties of a RequestFailed. */
        interface IRequestFailed {

            /** RequestFailed requestDetails */
            requestDetails?: (websocket_api.server.RequestFailed.IRequestDetails|null);

            /** RequestFailed errorDetails */
            errorDetails?: (websocket_api.server.RequestFailed.IErrorDetails|null);
        }

        /** Represents a RequestFailed. */
        class RequestFailed implements IRequestFailed {

            /**
             * Constructs a new RequestFailed.
             * @param [properties] Properties to set
             */
            constructor(properties?: websocket_api.server.IRequestFailed);

            /** RequestFailed requestDetails. */
            public requestDetails?: (websocket_api.server.RequestFailed.IRequestDetails|null);

            /** RequestFailed errorDetails. */
            public errorDetails?: (websocket_api.server.RequestFailed.IErrorDetails|null);

            /**
             * Creates a new RequestFailed instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RequestFailed instance
             */
            public static create(properties?: websocket_api.server.IRequestFailed): websocket_api.server.RequestFailed;

            /**
             * Encodes the specified RequestFailed message. Does not implicitly {@link websocket_api.server.RequestFailed.verify|verify} messages.
             * @param message RequestFailed message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: websocket_api.server.IRequestFailed, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RequestFailed message, length delimited. Does not implicitly {@link websocket_api.server.RequestFailed.verify|verify} messages.
             * @param message RequestFailed message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: websocket_api.server.IRequestFailed, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RequestFailed message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RequestFailed
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): websocket_api.server.RequestFailed;

            /**
             * Decodes a RequestFailed message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RequestFailed
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): websocket_api.server.RequestFailed;

            /**
             * Verifies a RequestFailed message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RequestFailed message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RequestFailed
             */
            public static fromObject(object: { [k: string]: any }): websocket_api.server.RequestFailed;

            /**
             * Creates a plain object from a RequestFailed message. Also converts values to other types if specified.
             * @param message RequestFailed
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: websocket_api.server.RequestFailed, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RequestFailed to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for RequestFailed
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace RequestFailed {

            /** Properties of a RequestDetails. */
            interface IRequestDetails {

                /** RequestDetails kind */
                kind?: (string|null);
            }

            /** Represents a RequestDetails. */
            class RequestDetails implements IRequestDetails {

                /**
                 * Constructs a new RequestDetails.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: websocket_api.server.RequestFailed.IRequestDetails);

                /** RequestDetails kind. */
                public kind: string;

                /**
                 * Creates a new RequestDetails instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RequestDetails instance
                 */
                public static create(properties?: websocket_api.server.RequestFailed.IRequestDetails): websocket_api.server.RequestFailed.RequestDetails;

                /**
                 * Encodes the specified RequestDetails message. Does not implicitly {@link websocket_api.server.RequestFailed.RequestDetails.verify|verify} messages.
                 * @param message RequestDetails message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: websocket_api.server.RequestFailed.IRequestDetails, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RequestDetails message, length delimited. Does not implicitly {@link websocket_api.server.RequestFailed.RequestDetails.verify|verify} messages.
                 * @param message RequestDetails message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: websocket_api.server.RequestFailed.IRequestDetails, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RequestDetails message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RequestDetails
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): websocket_api.server.RequestFailed.RequestDetails;

                /**
                 * Decodes a RequestDetails message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RequestDetails
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): websocket_api.server.RequestFailed.RequestDetails;

                /**
                 * Verifies a RequestDetails message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RequestDetails message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RequestDetails
                 */
                public static fromObject(object: { [k: string]: any }): websocket_api.server.RequestFailed.RequestDetails;

                /**
                 * Creates a plain object from a RequestDetails message. Also converts values to other types if specified.
                 * @param message RequestDetails
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: websocket_api.server.RequestFailed.RequestDetails, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RequestDetails to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for RequestDetails
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an ErrorDetails. */
            interface IErrorDetails {

                /** ErrorDetails message */
                message?: (string|null);
            }

            /** Represents an ErrorDetails. */
            class ErrorDetails implements IErrorDetails {

                /**
                 * Constructs a new ErrorDetails.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: websocket_api.server.RequestFailed.IErrorDetails);

                /** ErrorDetails message. */
                public message: string;

                /**
                 * Creates a new ErrorDetails instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ErrorDetails instance
                 */
                public static create(properties?: websocket_api.server.RequestFailed.IErrorDetails): websocket_api.server.RequestFailed.ErrorDetails;

                /**
                 * Encodes the specified ErrorDetails message. Does not implicitly {@link websocket_api.server.RequestFailed.ErrorDetails.verify|verify} messages.
                 * @param message ErrorDetails message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: websocket_api.server.RequestFailed.IErrorDetails, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ErrorDetails message, length delimited. Does not implicitly {@link websocket_api.server.RequestFailed.ErrorDetails.verify|verify} messages.
                 * @param message ErrorDetails message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: websocket_api.server.RequestFailed.IErrorDetails, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an ErrorDetails message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ErrorDetails
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): websocket_api.server.RequestFailed.ErrorDetails;

                /**
                 * Decodes an ErrorDetails message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ErrorDetails
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): websocket_api.server.RequestFailed.ErrorDetails;

                /**
                 * Verifies an ErrorDetails message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an ErrorDetails message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ErrorDetails
                 */
                public static fromObject(object: { [k: string]: any }): websocket_api.server.RequestFailed.ErrorDetails;

                /**
                 * Creates a plain object from an ErrorDetails message. Also converts values to other types if specified.
                 * @param message ErrorDetails
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: websocket_api.server.RequestFailed.ErrorDetails, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ErrorDetails to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ErrorDetails
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of a Timestamp. */
        interface ITimestamp {

            /** Timestamp seconds */
            seconds?: (number|Long|null);

            /** Timestamp nanos */
            nanos?: (number|null);
        }

        /** Represents a Timestamp. */
        class Timestamp implements ITimestamp {

            /**
             * Constructs a new Timestamp.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.ITimestamp);

            /** Timestamp seconds. */
            public seconds: (number|Long);

            /** Timestamp nanos. */
            public nanos: number;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Timestamp instance
             */
            public static create(properties?: google.protobuf.ITimestamp): google.protobuf.Timestamp;

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Timestamp;

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Timestamp;

            /**
             * Verifies a Timestamp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Timestamp
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Timestamp;

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @param message Timestamp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Timestamp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Timestamp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Timestamp
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }
}
