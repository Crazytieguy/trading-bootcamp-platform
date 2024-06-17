/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.ServerMessage = (function() {

    /**
     * Properties of a ServerMessage.
     * @exports IServerMessage
     * @interface IServerMessage
     * @property {IPortfolio|null} [portfolioState] ServerMessage portfolioState
     * @property {IMarket|null} [marketState] ServerMessage marketState
     * @property {IMarket|null} [marketCreated] ServerMessage marketCreated
     * @property {IMarketSettled|null} [marketSettled] ServerMessage marketSettled
     * @property {IOrder|null} [orderCreated] ServerMessage orderCreated
     * @property {IOrderCancelled|null} [orderCancelled] ServerMessage orderCancelled
     * @property {IOrderFilled|null} [orderFilled] ServerMessage orderFilled
     * @property {ITrade|null} [tradeExecuted] ServerMessage tradeExecuted
     * @property {IRequestFailed|null} [requestFailed] ServerMessage requestFailed
     */

    /**
     * Constructs a new ServerMessage.
     * @exports ServerMessage
     * @classdesc Represents a ServerMessage.
     * @implements IServerMessage
     * @constructor
     * @param {IServerMessage=} [properties] Properties to set
     */
    function ServerMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ServerMessage portfolioState.
     * @member {IPortfolio|null|undefined} portfolioState
     * @memberof ServerMessage
     * @instance
     */
    ServerMessage.prototype.portfolioState = null;

    /**
     * ServerMessage marketState.
     * @member {IMarket|null|undefined} marketState
     * @memberof ServerMessage
     * @instance
     */
    ServerMessage.prototype.marketState = null;

    /**
     * ServerMessage marketCreated.
     * @member {IMarket|null|undefined} marketCreated
     * @memberof ServerMessage
     * @instance
     */
    ServerMessage.prototype.marketCreated = null;

    /**
     * ServerMessage marketSettled.
     * @member {IMarketSettled|null|undefined} marketSettled
     * @memberof ServerMessage
     * @instance
     */
    ServerMessage.prototype.marketSettled = null;

    /**
     * ServerMessage orderCreated.
     * @member {IOrder|null|undefined} orderCreated
     * @memberof ServerMessage
     * @instance
     */
    ServerMessage.prototype.orderCreated = null;

    /**
     * ServerMessage orderCancelled.
     * @member {IOrderCancelled|null|undefined} orderCancelled
     * @memberof ServerMessage
     * @instance
     */
    ServerMessage.prototype.orderCancelled = null;

    /**
     * ServerMessage orderFilled.
     * @member {IOrderFilled|null|undefined} orderFilled
     * @memberof ServerMessage
     * @instance
     */
    ServerMessage.prototype.orderFilled = null;

    /**
     * ServerMessage tradeExecuted.
     * @member {ITrade|null|undefined} tradeExecuted
     * @memberof ServerMessage
     * @instance
     */
    ServerMessage.prototype.tradeExecuted = null;

    /**
     * ServerMessage requestFailed.
     * @member {IRequestFailed|null|undefined} requestFailed
     * @memberof ServerMessage
     * @instance
     */
    ServerMessage.prototype.requestFailed = null;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * ServerMessage message.
     * @member {"portfolioState"|"marketState"|"marketCreated"|"marketSettled"|"orderCreated"|"orderCancelled"|"orderFilled"|"tradeExecuted"|"requestFailed"|undefined} message
     * @memberof ServerMessage
     * @instance
     */
    Object.defineProperty(ServerMessage.prototype, "message", {
        get: $util.oneOfGetter($oneOfFields = ["portfolioState", "marketState", "marketCreated", "marketSettled", "orderCreated", "orderCancelled", "orderFilled", "tradeExecuted", "requestFailed"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new ServerMessage instance using the specified properties.
     * @function create
     * @memberof ServerMessage
     * @static
     * @param {IServerMessage=} [properties] Properties to set
     * @returns {ServerMessage} ServerMessage instance
     */
    ServerMessage.create = function create(properties) {
        return new ServerMessage(properties);
    };

    /**
     * Encodes the specified ServerMessage message. Does not implicitly {@link ServerMessage.verify|verify} messages.
     * @function encode
     * @memberof ServerMessage
     * @static
     * @param {IServerMessage} message ServerMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ServerMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.portfolioState != null && Object.hasOwnProperty.call(message, "portfolioState"))
            $root.Portfolio.encode(message.portfolioState, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.marketState != null && Object.hasOwnProperty.call(message, "marketState"))
            $root.Market.encode(message.marketState, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.marketCreated != null && Object.hasOwnProperty.call(message, "marketCreated"))
            $root.Market.encode(message.marketCreated, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.marketSettled != null && Object.hasOwnProperty.call(message, "marketSettled"))
            $root.MarketSettled.encode(message.marketSettled, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.orderCreated != null && Object.hasOwnProperty.call(message, "orderCreated"))
            $root.Order.encode(message.orderCreated, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.orderCancelled != null && Object.hasOwnProperty.call(message, "orderCancelled"))
            $root.OrderCancelled.encode(message.orderCancelled, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.orderFilled != null && Object.hasOwnProperty.call(message, "orderFilled"))
            $root.OrderFilled.encode(message.orderFilled, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        if (message.tradeExecuted != null && Object.hasOwnProperty.call(message, "tradeExecuted"))
            $root.Trade.encode(message.tradeExecuted, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
        if (message.requestFailed != null && Object.hasOwnProperty.call(message, "requestFailed"))
            $root.RequestFailed.encode(message.requestFailed, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified ServerMessage message, length delimited. Does not implicitly {@link ServerMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ServerMessage
     * @static
     * @param {IServerMessage} message ServerMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ServerMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ServerMessage message from the specified reader or buffer.
     * @function decode
     * @memberof ServerMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ServerMessage} ServerMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ServerMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServerMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.portfolioState = $root.Portfolio.decode(reader, reader.uint32());
                    break;
                }
            case 2: {
                    message.marketState = $root.Market.decode(reader, reader.uint32());
                    break;
                }
            case 3: {
                    message.marketCreated = $root.Market.decode(reader, reader.uint32());
                    break;
                }
            case 4: {
                    message.marketSettled = $root.MarketSettled.decode(reader, reader.uint32());
                    break;
                }
            case 5: {
                    message.orderCreated = $root.Order.decode(reader, reader.uint32());
                    break;
                }
            case 6: {
                    message.orderCancelled = $root.OrderCancelled.decode(reader, reader.uint32());
                    break;
                }
            case 7: {
                    message.orderFilled = $root.OrderFilled.decode(reader, reader.uint32());
                    break;
                }
            case 8: {
                    message.tradeExecuted = $root.Trade.decode(reader, reader.uint32());
                    break;
                }
            case 9: {
                    message.requestFailed = $root.RequestFailed.decode(reader, reader.uint32());
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ServerMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ServerMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ServerMessage} ServerMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ServerMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ServerMessage message.
     * @function verify
     * @memberof ServerMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ServerMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.portfolioState != null && message.hasOwnProperty("portfolioState")) {
            properties.message = 1;
            {
                var error = $root.Portfolio.verify(message.portfolioState);
                if (error)
                    return "portfolioState." + error;
            }
        }
        if (message.marketState != null && message.hasOwnProperty("marketState")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                var error = $root.Market.verify(message.marketState);
                if (error)
                    return "marketState." + error;
            }
        }
        if (message.marketCreated != null && message.hasOwnProperty("marketCreated")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                var error = $root.Market.verify(message.marketCreated);
                if (error)
                    return "marketCreated." + error;
            }
        }
        if (message.marketSettled != null && message.hasOwnProperty("marketSettled")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                var error = $root.MarketSettled.verify(message.marketSettled);
                if (error)
                    return "marketSettled." + error;
            }
        }
        if (message.orderCreated != null && message.hasOwnProperty("orderCreated")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                var error = $root.Order.verify(message.orderCreated);
                if (error)
                    return "orderCreated." + error;
            }
        }
        if (message.orderCancelled != null && message.hasOwnProperty("orderCancelled")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                var error = $root.OrderCancelled.verify(message.orderCancelled);
                if (error)
                    return "orderCancelled." + error;
            }
        }
        if (message.orderFilled != null && message.hasOwnProperty("orderFilled")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                var error = $root.OrderFilled.verify(message.orderFilled);
                if (error)
                    return "orderFilled." + error;
            }
        }
        if (message.tradeExecuted != null && message.hasOwnProperty("tradeExecuted")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                var error = $root.Trade.verify(message.tradeExecuted);
                if (error)
                    return "tradeExecuted." + error;
            }
        }
        if (message.requestFailed != null && message.hasOwnProperty("requestFailed")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                var error = $root.RequestFailed.verify(message.requestFailed);
                if (error)
                    return "requestFailed." + error;
            }
        }
        return null;
    };

    /**
     * Creates a ServerMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ServerMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ServerMessage} ServerMessage
     */
    ServerMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.ServerMessage)
            return object;
        var message = new $root.ServerMessage();
        if (object.portfolioState != null) {
            if (typeof object.portfolioState !== "object")
                throw TypeError(".ServerMessage.portfolioState: object expected");
            message.portfolioState = $root.Portfolio.fromObject(object.portfolioState);
        }
        if (object.marketState != null) {
            if (typeof object.marketState !== "object")
                throw TypeError(".ServerMessage.marketState: object expected");
            message.marketState = $root.Market.fromObject(object.marketState);
        }
        if (object.marketCreated != null) {
            if (typeof object.marketCreated !== "object")
                throw TypeError(".ServerMessage.marketCreated: object expected");
            message.marketCreated = $root.Market.fromObject(object.marketCreated);
        }
        if (object.marketSettled != null) {
            if (typeof object.marketSettled !== "object")
                throw TypeError(".ServerMessage.marketSettled: object expected");
            message.marketSettled = $root.MarketSettled.fromObject(object.marketSettled);
        }
        if (object.orderCreated != null) {
            if (typeof object.orderCreated !== "object")
                throw TypeError(".ServerMessage.orderCreated: object expected");
            message.orderCreated = $root.Order.fromObject(object.orderCreated);
        }
        if (object.orderCancelled != null) {
            if (typeof object.orderCancelled !== "object")
                throw TypeError(".ServerMessage.orderCancelled: object expected");
            message.orderCancelled = $root.OrderCancelled.fromObject(object.orderCancelled);
        }
        if (object.orderFilled != null) {
            if (typeof object.orderFilled !== "object")
                throw TypeError(".ServerMessage.orderFilled: object expected");
            message.orderFilled = $root.OrderFilled.fromObject(object.orderFilled);
        }
        if (object.tradeExecuted != null) {
            if (typeof object.tradeExecuted !== "object")
                throw TypeError(".ServerMessage.tradeExecuted: object expected");
            message.tradeExecuted = $root.Trade.fromObject(object.tradeExecuted);
        }
        if (object.requestFailed != null) {
            if (typeof object.requestFailed !== "object")
                throw TypeError(".ServerMessage.requestFailed: object expected");
            message.requestFailed = $root.RequestFailed.fromObject(object.requestFailed);
        }
        return message;
    };

    /**
     * Creates a plain object from a ServerMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ServerMessage
     * @static
     * @param {ServerMessage} message ServerMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ServerMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (message.portfolioState != null && message.hasOwnProperty("portfolioState")) {
            object.portfolioState = $root.Portfolio.toObject(message.portfolioState, options);
            if (options.oneofs)
                object.message = "portfolioState";
        }
        if (message.marketState != null && message.hasOwnProperty("marketState")) {
            object.marketState = $root.Market.toObject(message.marketState, options);
            if (options.oneofs)
                object.message = "marketState";
        }
        if (message.marketCreated != null && message.hasOwnProperty("marketCreated")) {
            object.marketCreated = $root.Market.toObject(message.marketCreated, options);
            if (options.oneofs)
                object.message = "marketCreated";
        }
        if (message.marketSettled != null && message.hasOwnProperty("marketSettled")) {
            object.marketSettled = $root.MarketSettled.toObject(message.marketSettled, options);
            if (options.oneofs)
                object.message = "marketSettled";
        }
        if (message.orderCreated != null && message.hasOwnProperty("orderCreated")) {
            object.orderCreated = $root.Order.toObject(message.orderCreated, options);
            if (options.oneofs)
                object.message = "orderCreated";
        }
        if (message.orderCancelled != null && message.hasOwnProperty("orderCancelled")) {
            object.orderCancelled = $root.OrderCancelled.toObject(message.orderCancelled, options);
            if (options.oneofs)
                object.message = "orderCancelled";
        }
        if (message.orderFilled != null && message.hasOwnProperty("orderFilled")) {
            object.orderFilled = $root.OrderFilled.toObject(message.orderFilled, options);
            if (options.oneofs)
                object.message = "orderFilled";
        }
        if (message.tradeExecuted != null && message.hasOwnProperty("tradeExecuted")) {
            object.tradeExecuted = $root.Trade.toObject(message.tradeExecuted, options);
            if (options.oneofs)
                object.message = "tradeExecuted";
        }
        if (message.requestFailed != null && message.hasOwnProperty("requestFailed")) {
            object.requestFailed = $root.RequestFailed.toObject(message.requestFailed, options);
            if (options.oneofs)
                object.message = "requestFailed";
        }
        return object;
    };

    /**
     * Converts this ServerMessage to JSON.
     * @function toJSON
     * @memberof ServerMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ServerMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for ServerMessage
     * @function getTypeUrl
     * @memberof ServerMessage
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    ServerMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/ServerMessage";
    };

    return ServerMessage;
})();

$root.Portfolio = (function() {

    /**
     * Properties of a Portfolio.
     * @exports IPortfolio
     * @interface IPortfolio
     * @property {string|null} [totalBalance] Portfolio totalBalance
     * @property {string|null} [availableBalance] Portfolio availableBalance
     * @property {Array.<Portfolio.IMarketExposure>|null} [marketExposures] Portfolio marketExposures
     */

    /**
     * Constructs a new Portfolio.
     * @exports Portfolio
     * @classdesc Represents a Portfolio.
     * @implements IPortfolio
     * @constructor
     * @param {IPortfolio=} [properties] Properties to set
     */
    function Portfolio(properties) {
        this.marketExposures = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Portfolio totalBalance.
     * @member {string} totalBalance
     * @memberof Portfolio
     * @instance
     */
    Portfolio.prototype.totalBalance = "";

    /**
     * Portfolio availableBalance.
     * @member {string} availableBalance
     * @memberof Portfolio
     * @instance
     */
    Portfolio.prototype.availableBalance = "";

    /**
     * Portfolio marketExposures.
     * @member {Array.<Portfolio.IMarketExposure>} marketExposures
     * @memberof Portfolio
     * @instance
     */
    Portfolio.prototype.marketExposures = $util.emptyArray;

    /**
     * Creates a new Portfolio instance using the specified properties.
     * @function create
     * @memberof Portfolio
     * @static
     * @param {IPortfolio=} [properties] Properties to set
     * @returns {Portfolio} Portfolio instance
     */
    Portfolio.create = function create(properties) {
        return new Portfolio(properties);
    };

    /**
     * Encodes the specified Portfolio message. Does not implicitly {@link Portfolio.verify|verify} messages.
     * @function encode
     * @memberof Portfolio
     * @static
     * @param {IPortfolio} message Portfolio message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Portfolio.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.totalBalance != null && Object.hasOwnProperty.call(message, "totalBalance"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.totalBalance);
        if (message.availableBalance != null && Object.hasOwnProperty.call(message, "availableBalance"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.availableBalance);
        if (message.marketExposures != null && message.marketExposures.length)
            for (var i = 0; i < message.marketExposures.length; ++i)
                $root.Portfolio.MarketExposure.encode(message.marketExposures[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Portfolio message, length delimited. Does not implicitly {@link Portfolio.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Portfolio
     * @static
     * @param {IPortfolio} message Portfolio message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Portfolio.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Portfolio message from the specified reader or buffer.
     * @function decode
     * @memberof Portfolio
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Portfolio} Portfolio
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Portfolio.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Portfolio();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.totalBalance = reader.string();
                    break;
                }
            case 2: {
                    message.availableBalance = reader.string();
                    break;
                }
            case 3: {
                    if (!(message.marketExposures && message.marketExposures.length))
                        message.marketExposures = [];
                    message.marketExposures.push($root.Portfolio.MarketExposure.decode(reader, reader.uint32()));
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Portfolio message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Portfolio
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Portfolio} Portfolio
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Portfolio.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Portfolio message.
     * @function verify
     * @memberof Portfolio
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Portfolio.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.totalBalance != null && message.hasOwnProperty("totalBalance"))
            if (!$util.isString(message.totalBalance))
                return "totalBalance: string expected";
        if (message.availableBalance != null && message.hasOwnProperty("availableBalance"))
            if (!$util.isString(message.availableBalance))
                return "availableBalance: string expected";
        if (message.marketExposures != null && message.hasOwnProperty("marketExposures")) {
            if (!Array.isArray(message.marketExposures))
                return "marketExposures: array expected";
            for (var i = 0; i < message.marketExposures.length; ++i) {
                var error = $root.Portfolio.MarketExposure.verify(message.marketExposures[i]);
                if (error)
                    return "marketExposures." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Portfolio message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Portfolio
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Portfolio} Portfolio
     */
    Portfolio.fromObject = function fromObject(object) {
        if (object instanceof $root.Portfolio)
            return object;
        var message = new $root.Portfolio();
        if (object.totalBalance != null)
            message.totalBalance = String(object.totalBalance);
        if (object.availableBalance != null)
            message.availableBalance = String(object.availableBalance);
        if (object.marketExposures) {
            if (!Array.isArray(object.marketExposures))
                throw TypeError(".Portfolio.marketExposures: array expected");
            message.marketExposures = [];
            for (var i = 0; i < object.marketExposures.length; ++i) {
                if (typeof object.marketExposures[i] !== "object")
                    throw TypeError(".Portfolio.marketExposures: object expected");
                message.marketExposures[i] = $root.Portfolio.MarketExposure.fromObject(object.marketExposures[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a Portfolio message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Portfolio
     * @static
     * @param {Portfolio} message Portfolio
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Portfolio.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.marketExposures = [];
        if (options.defaults) {
            object.totalBalance = "";
            object.availableBalance = "";
        }
        if (message.totalBalance != null && message.hasOwnProperty("totalBalance"))
            object.totalBalance = message.totalBalance;
        if (message.availableBalance != null && message.hasOwnProperty("availableBalance"))
            object.availableBalance = message.availableBalance;
        if (message.marketExposures && message.marketExposures.length) {
            object.marketExposures = [];
            for (var j = 0; j < message.marketExposures.length; ++j)
                object.marketExposures[j] = $root.Portfolio.MarketExposure.toObject(message.marketExposures[j], options);
        }
        return object;
    };

    /**
     * Converts this Portfolio to JSON.
     * @function toJSON
     * @memberof Portfolio
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Portfolio.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Portfolio
     * @function getTypeUrl
     * @memberof Portfolio
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Portfolio.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Portfolio";
    };

    Portfolio.MarketExposure = (function() {

        /**
         * Properties of a MarketExposure.
         * @memberof Portfolio
         * @interface IMarketExposure
         * @property {string|null} [marketId] MarketExposure marketId
         * @property {string|null} [position] MarketExposure position
         * @property {number|null} [orders] MarketExposure orders
         */

        /**
         * Constructs a new MarketExposure.
         * @memberof Portfolio
         * @classdesc Represents a MarketExposure.
         * @implements IMarketExposure
         * @constructor
         * @param {Portfolio.IMarketExposure=} [properties] Properties to set
         */
        function MarketExposure(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MarketExposure marketId.
         * @member {string} marketId
         * @memberof Portfolio.MarketExposure
         * @instance
         */
        MarketExposure.prototype.marketId = "";

        /**
         * MarketExposure position.
         * @member {string} position
         * @memberof Portfolio.MarketExposure
         * @instance
         */
        MarketExposure.prototype.position = "";

        /**
         * MarketExposure orders.
         * @member {number} orders
         * @memberof Portfolio.MarketExposure
         * @instance
         */
        MarketExposure.prototype.orders = 0;

        /**
         * Creates a new MarketExposure instance using the specified properties.
         * @function create
         * @memberof Portfolio.MarketExposure
         * @static
         * @param {Portfolio.IMarketExposure=} [properties] Properties to set
         * @returns {Portfolio.MarketExposure} MarketExposure instance
         */
        MarketExposure.create = function create(properties) {
            return new MarketExposure(properties);
        };

        /**
         * Encodes the specified MarketExposure message. Does not implicitly {@link Portfolio.MarketExposure.verify|verify} messages.
         * @function encode
         * @memberof Portfolio.MarketExposure
         * @static
         * @param {Portfolio.IMarketExposure} message MarketExposure message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MarketExposure.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.marketId != null && Object.hasOwnProperty.call(message, "marketId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.marketId);
            if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.position);
            if (message.orders != null && Object.hasOwnProperty.call(message, "orders"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.orders);
            return writer;
        };

        /**
         * Encodes the specified MarketExposure message, length delimited. Does not implicitly {@link Portfolio.MarketExposure.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Portfolio.MarketExposure
         * @static
         * @param {Portfolio.IMarketExposure} message MarketExposure message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MarketExposure.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MarketExposure message from the specified reader or buffer.
         * @function decode
         * @memberof Portfolio.MarketExposure
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Portfolio.MarketExposure} MarketExposure
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MarketExposure.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Portfolio.MarketExposure();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.marketId = reader.string();
                        break;
                    }
                case 2: {
                        message.position = reader.string();
                        break;
                    }
                case 3: {
                        message.orders = reader.uint32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MarketExposure message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Portfolio.MarketExposure
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Portfolio.MarketExposure} MarketExposure
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MarketExposure.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MarketExposure message.
         * @function verify
         * @memberof Portfolio.MarketExposure
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MarketExposure.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.marketId != null && message.hasOwnProperty("marketId"))
                if (!$util.isString(message.marketId))
                    return "marketId: string expected";
            if (message.position != null && message.hasOwnProperty("position"))
                if (!$util.isString(message.position))
                    return "position: string expected";
            if (message.orders != null && message.hasOwnProperty("orders"))
                if (!$util.isInteger(message.orders))
                    return "orders: integer expected";
            return null;
        };

        /**
         * Creates a MarketExposure message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Portfolio.MarketExposure
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Portfolio.MarketExposure} MarketExposure
         */
        MarketExposure.fromObject = function fromObject(object) {
            if (object instanceof $root.Portfolio.MarketExposure)
                return object;
            var message = new $root.Portfolio.MarketExposure();
            if (object.marketId != null)
                message.marketId = String(object.marketId);
            if (object.position != null)
                message.position = String(object.position);
            if (object.orders != null)
                message.orders = object.orders >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a MarketExposure message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Portfolio.MarketExposure
         * @static
         * @param {Portfolio.MarketExposure} message MarketExposure
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MarketExposure.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.marketId = "";
                object.position = "";
                object.orders = 0;
            }
            if (message.marketId != null && message.hasOwnProperty("marketId"))
                object.marketId = message.marketId;
            if (message.position != null && message.hasOwnProperty("position"))
                object.position = message.position;
            if (message.orders != null && message.hasOwnProperty("orders"))
                object.orders = message.orders;
            return object;
        };

        /**
         * Converts this MarketExposure to JSON.
         * @function toJSON
         * @memberof Portfolio.MarketExposure
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MarketExposure.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MarketExposure
         * @function getTypeUrl
         * @memberof Portfolio.MarketExposure
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MarketExposure.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Portfolio.MarketExposure";
        };

        return MarketExposure;
    })();

    return Portfolio;
})();

$root.Market = (function() {

    /**
     * Properties of a Market.
     * @exports IMarket
     * @interface IMarket
     * @property {string|null} [id] Market id
     * @property {string|null} [name] Market name
     * @property {string|null} [description] Market description
     * @property {string|null} [ownerId] Market ownerId
     * @property {string|null} [minSettlement] Market minSettlement
     * @property {string|null} [maxSettlement] Market maxSettlement
     * @property {Market.IOpen|null} [open] Market open
     * @property {Market.IClosed|null} [closed] Market closed
     * @property {Market.IState|null} [state] Market state
     */

    /**
     * Constructs a new Market.
     * @exports Market
     * @classdesc Represents a Market.
     * @implements IMarket
     * @constructor
     * @param {IMarket=} [properties] Properties to set
     */
    function Market(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Market id.
     * @member {string} id
     * @memberof Market
     * @instance
     */
    Market.prototype.id = "";

    /**
     * Market name.
     * @member {string} name
     * @memberof Market
     * @instance
     */
    Market.prototype.name = "";

    /**
     * Market description.
     * @member {string} description
     * @memberof Market
     * @instance
     */
    Market.prototype.description = "";

    /**
     * Market ownerId.
     * @member {string} ownerId
     * @memberof Market
     * @instance
     */
    Market.prototype.ownerId = "";

    /**
     * Market minSettlement.
     * @member {string} minSettlement
     * @memberof Market
     * @instance
     */
    Market.prototype.minSettlement = "";

    /**
     * Market maxSettlement.
     * @member {string} maxSettlement
     * @memberof Market
     * @instance
     */
    Market.prototype.maxSettlement = "";

    /**
     * Market open.
     * @member {Market.IOpen|null|undefined} open
     * @memberof Market
     * @instance
     */
    Market.prototype.open = null;

    /**
     * Market closed.
     * @member {Market.IClosed|null|undefined} closed
     * @memberof Market
     * @instance
     */
    Market.prototype.closed = null;

    /**
     * Market state.
     * @member {Market.IState|null|undefined} state
     * @memberof Market
     * @instance
     */
    Market.prototype.state = null;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * Market status.
     * @member {"open"|"closed"|undefined} status
     * @memberof Market
     * @instance
     */
    Object.defineProperty(Market.prototype, "status", {
        get: $util.oneOfGetter($oneOfFields = ["open", "closed"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Market _state.
     * @member {"state"|undefined} _state
     * @memberof Market
     * @instance
     */
    Object.defineProperty(Market.prototype, "_state", {
        get: $util.oneOfGetter($oneOfFields = ["state"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new Market instance using the specified properties.
     * @function create
     * @memberof Market
     * @static
     * @param {IMarket=} [properties] Properties to set
     * @returns {Market} Market instance
     */
    Market.create = function create(properties) {
        return new Market(properties);
    };

    /**
     * Encodes the specified Market message. Does not implicitly {@link Market.verify|verify} messages.
     * @function encode
     * @memberof Market
     * @static
     * @param {IMarket} message Market message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Market.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
        if (message.description != null && Object.hasOwnProperty.call(message, "description"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.description);
        if (message.ownerId != null && Object.hasOwnProperty.call(message, "ownerId"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.ownerId);
        if (message.minSettlement != null && Object.hasOwnProperty.call(message, "minSettlement"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.minSettlement);
        if (message.maxSettlement != null && Object.hasOwnProperty.call(message, "maxSettlement"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.maxSettlement);
        if (message.open != null && Object.hasOwnProperty.call(message, "open"))
            $root.Market.Open.encode(message.open, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        if (message.closed != null && Object.hasOwnProperty.call(message, "closed"))
            $root.Market.Closed.encode(message.closed, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
        if (message.state != null && Object.hasOwnProperty.call(message, "state"))
            $root.Market.State.encode(message.state, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Market message, length delimited. Does not implicitly {@link Market.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Market
     * @static
     * @param {IMarket} message Market message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Market.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Market message from the specified reader or buffer.
     * @function decode
     * @memberof Market
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Market} Market
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Market.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Market();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.id = reader.string();
                    break;
                }
            case 2: {
                    message.name = reader.string();
                    break;
                }
            case 3: {
                    message.description = reader.string();
                    break;
                }
            case 4: {
                    message.ownerId = reader.string();
                    break;
                }
            case 5: {
                    message.minSettlement = reader.string();
                    break;
                }
            case 6: {
                    message.maxSettlement = reader.string();
                    break;
                }
            case 7: {
                    message.open = $root.Market.Open.decode(reader, reader.uint32());
                    break;
                }
            case 8: {
                    message.closed = $root.Market.Closed.decode(reader, reader.uint32());
                    break;
                }
            case 9: {
                    message.state = $root.Market.State.decode(reader, reader.uint32());
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Market message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Market
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Market} Market
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Market.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Market message.
     * @function verify
     * @memberof Market
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Market.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isString(message.id))
                return "id: string expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.description != null && message.hasOwnProperty("description"))
            if (!$util.isString(message.description))
                return "description: string expected";
        if (message.ownerId != null && message.hasOwnProperty("ownerId"))
            if (!$util.isString(message.ownerId))
                return "ownerId: string expected";
        if (message.minSettlement != null && message.hasOwnProperty("minSettlement"))
            if (!$util.isString(message.minSettlement))
                return "minSettlement: string expected";
        if (message.maxSettlement != null && message.hasOwnProperty("maxSettlement"))
            if (!$util.isString(message.maxSettlement))
                return "maxSettlement: string expected";
        if (message.open != null && message.hasOwnProperty("open")) {
            properties.status = 1;
            {
                var error = $root.Market.Open.verify(message.open);
                if (error)
                    return "open." + error;
            }
        }
        if (message.closed != null && message.hasOwnProperty("closed")) {
            if (properties.status === 1)
                return "status: multiple values";
            properties.status = 1;
            {
                var error = $root.Market.Closed.verify(message.closed);
                if (error)
                    return "closed." + error;
            }
        }
        if (message.state != null && message.hasOwnProperty("state")) {
            properties._state = 1;
            {
                var error = $root.Market.State.verify(message.state);
                if (error)
                    return "state." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Market message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Market
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Market} Market
     */
    Market.fromObject = function fromObject(object) {
        if (object instanceof $root.Market)
            return object;
        var message = new $root.Market();
        if (object.id != null)
            message.id = String(object.id);
        if (object.name != null)
            message.name = String(object.name);
        if (object.description != null)
            message.description = String(object.description);
        if (object.ownerId != null)
            message.ownerId = String(object.ownerId);
        if (object.minSettlement != null)
            message.minSettlement = String(object.minSettlement);
        if (object.maxSettlement != null)
            message.maxSettlement = String(object.maxSettlement);
        if (object.open != null) {
            if (typeof object.open !== "object")
                throw TypeError(".Market.open: object expected");
            message.open = $root.Market.Open.fromObject(object.open);
        }
        if (object.closed != null) {
            if (typeof object.closed !== "object")
                throw TypeError(".Market.closed: object expected");
            message.closed = $root.Market.Closed.fromObject(object.closed);
        }
        if (object.state != null) {
            if (typeof object.state !== "object")
                throw TypeError(".Market.state: object expected");
            message.state = $root.Market.State.fromObject(object.state);
        }
        return message;
    };

    /**
     * Creates a plain object from a Market message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Market
     * @static
     * @param {Market} message Market
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Market.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.id = "";
            object.name = "";
            object.description = "";
            object.ownerId = "";
            object.minSettlement = "";
            object.maxSettlement = "";
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.description != null && message.hasOwnProperty("description"))
            object.description = message.description;
        if (message.ownerId != null && message.hasOwnProperty("ownerId"))
            object.ownerId = message.ownerId;
        if (message.minSettlement != null && message.hasOwnProperty("minSettlement"))
            object.minSettlement = message.minSettlement;
        if (message.maxSettlement != null && message.hasOwnProperty("maxSettlement"))
            object.maxSettlement = message.maxSettlement;
        if (message.open != null && message.hasOwnProperty("open")) {
            object.open = $root.Market.Open.toObject(message.open, options);
            if (options.oneofs)
                object.status = "open";
        }
        if (message.closed != null && message.hasOwnProperty("closed")) {
            object.closed = $root.Market.Closed.toObject(message.closed, options);
            if (options.oneofs)
                object.status = "closed";
        }
        if (message.state != null && message.hasOwnProperty("state")) {
            object.state = $root.Market.State.toObject(message.state, options);
            if (options.oneofs)
                object._state = "state";
        }
        return object;
    };

    /**
     * Converts this Market to JSON.
     * @function toJSON
     * @memberof Market
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Market.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Market
     * @function getTypeUrl
     * @memberof Market
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Market.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Market";
    };

    Market.State = (function() {

        /**
         * Properties of a State.
         * @memberof Market
         * @interface IState
         * @property {Array.<ITrade>|null} [tradeHistory] State tradeHistory
         * @property {Array.<IOrder>|null} [openOrders] State openOrders
         */

        /**
         * Constructs a new State.
         * @memberof Market
         * @classdesc Represents a State.
         * @implements IState
         * @constructor
         * @param {Market.IState=} [properties] Properties to set
         */
        function State(properties) {
            this.tradeHistory = [];
            this.openOrders = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * State tradeHistory.
         * @member {Array.<ITrade>} tradeHistory
         * @memberof Market.State
         * @instance
         */
        State.prototype.tradeHistory = $util.emptyArray;

        /**
         * State openOrders.
         * @member {Array.<IOrder>} openOrders
         * @memberof Market.State
         * @instance
         */
        State.prototype.openOrders = $util.emptyArray;

        /**
         * Creates a new State instance using the specified properties.
         * @function create
         * @memberof Market.State
         * @static
         * @param {Market.IState=} [properties] Properties to set
         * @returns {Market.State} State instance
         */
        State.create = function create(properties) {
            return new State(properties);
        };

        /**
         * Encodes the specified State message. Does not implicitly {@link Market.State.verify|verify} messages.
         * @function encode
         * @memberof Market.State
         * @static
         * @param {Market.IState} message State message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        State.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.tradeHistory != null && message.tradeHistory.length)
                for (var i = 0; i < message.tradeHistory.length; ++i)
                    $root.Trade.encode(message.tradeHistory[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.openOrders != null && message.openOrders.length)
                for (var i = 0; i < message.openOrders.length; ++i)
                    $root.Order.encode(message.openOrders[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified State message, length delimited. Does not implicitly {@link Market.State.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Market.State
         * @static
         * @param {Market.IState} message State message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        State.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a State message from the specified reader or buffer.
         * @function decode
         * @memberof Market.State
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Market.State} State
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        State.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Market.State();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 2: {
                        if (!(message.tradeHistory && message.tradeHistory.length))
                            message.tradeHistory = [];
                        message.tradeHistory.push($root.Trade.decode(reader, reader.uint32()));
                        break;
                    }
                case 3: {
                        if (!(message.openOrders && message.openOrders.length))
                            message.openOrders = [];
                        message.openOrders.push($root.Order.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a State message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Market.State
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Market.State} State
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        State.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a State message.
         * @function verify
         * @memberof Market.State
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        State.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.tradeHistory != null && message.hasOwnProperty("tradeHistory")) {
                if (!Array.isArray(message.tradeHistory))
                    return "tradeHistory: array expected";
                for (var i = 0; i < message.tradeHistory.length; ++i) {
                    var error = $root.Trade.verify(message.tradeHistory[i]);
                    if (error)
                        return "tradeHistory." + error;
                }
            }
            if (message.openOrders != null && message.hasOwnProperty("openOrders")) {
                if (!Array.isArray(message.openOrders))
                    return "openOrders: array expected";
                for (var i = 0; i < message.openOrders.length; ++i) {
                    var error = $root.Order.verify(message.openOrders[i]);
                    if (error)
                        return "openOrders." + error;
                }
            }
            return null;
        };

        /**
         * Creates a State message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Market.State
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Market.State} State
         */
        State.fromObject = function fromObject(object) {
            if (object instanceof $root.Market.State)
                return object;
            var message = new $root.Market.State();
            if (object.tradeHistory) {
                if (!Array.isArray(object.tradeHistory))
                    throw TypeError(".Market.State.tradeHistory: array expected");
                message.tradeHistory = [];
                for (var i = 0; i < object.tradeHistory.length; ++i) {
                    if (typeof object.tradeHistory[i] !== "object")
                        throw TypeError(".Market.State.tradeHistory: object expected");
                    message.tradeHistory[i] = $root.Trade.fromObject(object.tradeHistory[i]);
                }
            }
            if (object.openOrders) {
                if (!Array.isArray(object.openOrders))
                    throw TypeError(".Market.State.openOrders: array expected");
                message.openOrders = [];
                for (var i = 0; i < object.openOrders.length; ++i) {
                    if (typeof object.openOrders[i] !== "object")
                        throw TypeError(".Market.State.openOrders: object expected");
                    message.openOrders[i] = $root.Order.fromObject(object.openOrders[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a State message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Market.State
         * @static
         * @param {Market.State} message State
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        State.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.tradeHistory = [];
                object.openOrders = [];
            }
            if (message.tradeHistory && message.tradeHistory.length) {
                object.tradeHistory = [];
                for (var j = 0; j < message.tradeHistory.length; ++j)
                    object.tradeHistory[j] = $root.Trade.toObject(message.tradeHistory[j], options);
            }
            if (message.openOrders && message.openOrders.length) {
                object.openOrders = [];
                for (var j = 0; j < message.openOrders.length; ++j)
                    object.openOrders[j] = $root.Order.toObject(message.openOrders[j], options);
            }
            return object;
        };

        /**
         * Converts this State to JSON.
         * @function toJSON
         * @memberof Market.State
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        State.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for State
         * @function getTypeUrl
         * @memberof Market.State
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        State.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Market.State";
        };

        return State;
    })();

    Market.Open = (function() {

        /**
         * Properties of an Open.
         * @memberof Market
         * @interface IOpen
         */

        /**
         * Constructs a new Open.
         * @memberof Market
         * @classdesc Represents an Open.
         * @implements IOpen
         * @constructor
         * @param {Market.IOpen=} [properties] Properties to set
         */
        function Open(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Open instance using the specified properties.
         * @function create
         * @memberof Market.Open
         * @static
         * @param {Market.IOpen=} [properties] Properties to set
         * @returns {Market.Open} Open instance
         */
        Open.create = function create(properties) {
            return new Open(properties);
        };

        /**
         * Encodes the specified Open message. Does not implicitly {@link Market.Open.verify|verify} messages.
         * @function encode
         * @memberof Market.Open
         * @static
         * @param {Market.IOpen} message Open message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Open.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Open message, length delimited. Does not implicitly {@link Market.Open.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Market.Open
         * @static
         * @param {Market.IOpen} message Open message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Open.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Open message from the specified reader or buffer.
         * @function decode
         * @memberof Market.Open
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Market.Open} Open
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Open.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Market.Open();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Open message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Market.Open
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Market.Open} Open
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Open.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Open message.
         * @function verify
         * @memberof Market.Open
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Open.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates an Open message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Market.Open
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Market.Open} Open
         */
        Open.fromObject = function fromObject(object) {
            if (object instanceof $root.Market.Open)
                return object;
            return new $root.Market.Open();
        };

        /**
         * Creates a plain object from an Open message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Market.Open
         * @static
         * @param {Market.Open} message Open
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Open.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Open to JSON.
         * @function toJSON
         * @memberof Market.Open
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Open.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Open
         * @function getTypeUrl
         * @memberof Market.Open
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Open.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Market.Open";
        };

        return Open;
    })();

    Market.Closed = (function() {

        /**
         * Properties of a Closed.
         * @memberof Market
         * @interface IClosed
         * @property {string|null} [settlePrice] Closed settlePrice
         */

        /**
         * Constructs a new Closed.
         * @memberof Market
         * @classdesc Represents a Closed.
         * @implements IClosed
         * @constructor
         * @param {Market.IClosed=} [properties] Properties to set
         */
        function Closed(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Closed settlePrice.
         * @member {string} settlePrice
         * @memberof Market.Closed
         * @instance
         */
        Closed.prototype.settlePrice = "";

        /**
         * Creates a new Closed instance using the specified properties.
         * @function create
         * @memberof Market.Closed
         * @static
         * @param {Market.IClosed=} [properties] Properties to set
         * @returns {Market.Closed} Closed instance
         */
        Closed.create = function create(properties) {
            return new Closed(properties);
        };

        /**
         * Encodes the specified Closed message. Does not implicitly {@link Market.Closed.verify|verify} messages.
         * @function encode
         * @memberof Market.Closed
         * @static
         * @param {Market.IClosed} message Closed message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Closed.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.settlePrice != null && Object.hasOwnProperty.call(message, "settlePrice"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.settlePrice);
            return writer;
        };

        /**
         * Encodes the specified Closed message, length delimited. Does not implicitly {@link Market.Closed.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Market.Closed
         * @static
         * @param {Market.IClosed} message Closed message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Closed.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Closed message from the specified reader or buffer.
         * @function decode
         * @memberof Market.Closed
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Market.Closed} Closed
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Closed.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Market.Closed();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.settlePrice = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Closed message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Market.Closed
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Market.Closed} Closed
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Closed.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Closed message.
         * @function verify
         * @memberof Market.Closed
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Closed.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.settlePrice != null && message.hasOwnProperty("settlePrice"))
                if (!$util.isString(message.settlePrice))
                    return "settlePrice: string expected";
            return null;
        };

        /**
         * Creates a Closed message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Market.Closed
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Market.Closed} Closed
         */
        Closed.fromObject = function fromObject(object) {
            if (object instanceof $root.Market.Closed)
                return object;
            var message = new $root.Market.Closed();
            if (object.settlePrice != null)
                message.settlePrice = String(object.settlePrice);
            return message;
        };

        /**
         * Creates a plain object from a Closed message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Market.Closed
         * @static
         * @param {Market.Closed} message Closed
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Closed.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.settlePrice = "";
            if (message.settlePrice != null && message.hasOwnProperty("settlePrice"))
                object.settlePrice = message.settlePrice;
            return object;
        };

        /**
         * Converts this Closed to JSON.
         * @function toJSON
         * @memberof Market.Closed
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Closed.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Closed
         * @function getTypeUrl
         * @memberof Market.Closed
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Closed.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Market.Closed";
        };

        return Closed;
    })();

    return Market;
})();

$root.Trade = (function() {

    /**
     * Properties of a Trade.
     * @exports ITrade
     * @interface ITrade
     * @property {string|null} [marketId] Trade marketId
     * @property {google.protobuf.ITimestamp|null} [timestamp] Trade timestamp
     * @property {string|null} [price] Trade price
     * @property {string|null} [size] Trade size
     * @property {string|null} [buyer] Trade buyer
     * @property {string|null} [seller] Trade seller
     */

    /**
     * Constructs a new Trade.
     * @exports Trade
     * @classdesc Represents a Trade.
     * @implements ITrade
     * @constructor
     * @param {ITrade=} [properties] Properties to set
     */
    function Trade(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Trade marketId.
     * @member {string} marketId
     * @memberof Trade
     * @instance
     */
    Trade.prototype.marketId = "";

    /**
     * Trade timestamp.
     * @member {google.protobuf.ITimestamp|null|undefined} timestamp
     * @memberof Trade
     * @instance
     */
    Trade.prototype.timestamp = null;

    /**
     * Trade price.
     * @member {string} price
     * @memberof Trade
     * @instance
     */
    Trade.prototype.price = "";

    /**
     * Trade size.
     * @member {string} size
     * @memberof Trade
     * @instance
     */
    Trade.prototype.size = "";

    /**
     * Trade buyer.
     * @member {string} buyer
     * @memberof Trade
     * @instance
     */
    Trade.prototype.buyer = "";

    /**
     * Trade seller.
     * @member {string} seller
     * @memberof Trade
     * @instance
     */
    Trade.prototype.seller = "";

    /**
     * Creates a new Trade instance using the specified properties.
     * @function create
     * @memberof Trade
     * @static
     * @param {ITrade=} [properties] Properties to set
     * @returns {Trade} Trade instance
     */
    Trade.create = function create(properties) {
        return new Trade(properties);
    };

    /**
     * Encodes the specified Trade message. Does not implicitly {@link Trade.verify|verify} messages.
     * @function encode
     * @memberof Trade
     * @static
     * @param {ITrade} message Trade message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Trade.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.marketId != null && Object.hasOwnProperty.call(message, "marketId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.marketId);
        if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
            $root.google.protobuf.Timestamp.encode(message.timestamp, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.price != null && Object.hasOwnProperty.call(message, "price"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.price);
        if (message.size != null && Object.hasOwnProperty.call(message, "size"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.size);
        if (message.buyer != null && Object.hasOwnProperty.call(message, "buyer"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.buyer);
        if (message.seller != null && Object.hasOwnProperty.call(message, "seller"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.seller);
        return writer;
    };

    /**
     * Encodes the specified Trade message, length delimited. Does not implicitly {@link Trade.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Trade
     * @static
     * @param {ITrade} message Trade message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Trade.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Trade message from the specified reader or buffer.
     * @function decode
     * @memberof Trade
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Trade} Trade
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Trade.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Trade();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.marketId = reader.string();
                    break;
                }
            case 2: {
                    message.timestamp = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                    break;
                }
            case 3: {
                    message.price = reader.string();
                    break;
                }
            case 4: {
                    message.size = reader.string();
                    break;
                }
            case 5: {
                    message.buyer = reader.string();
                    break;
                }
            case 6: {
                    message.seller = reader.string();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Trade message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Trade
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Trade} Trade
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Trade.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Trade message.
     * @function verify
     * @memberof Trade
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Trade.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.marketId != null && message.hasOwnProperty("marketId"))
            if (!$util.isString(message.marketId))
                return "marketId: string expected";
        if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
            var error = $root.google.protobuf.Timestamp.verify(message.timestamp);
            if (error)
                return "timestamp." + error;
        }
        if (message.price != null && message.hasOwnProperty("price"))
            if (!$util.isString(message.price))
                return "price: string expected";
        if (message.size != null && message.hasOwnProperty("size"))
            if (!$util.isString(message.size))
                return "size: string expected";
        if (message.buyer != null && message.hasOwnProperty("buyer"))
            if (!$util.isString(message.buyer))
                return "buyer: string expected";
        if (message.seller != null && message.hasOwnProperty("seller"))
            if (!$util.isString(message.seller))
                return "seller: string expected";
        return null;
    };

    /**
     * Creates a Trade message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Trade
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Trade} Trade
     */
    Trade.fromObject = function fromObject(object) {
        if (object instanceof $root.Trade)
            return object;
        var message = new $root.Trade();
        if (object.marketId != null)
            message.marketId = String(object.marketId);
        if (object.timestamp != null) {
            if (typeof object.timestamp !== "object")
                throw TypeError(".Trade.timestamp: object expected");
            message.timestamp = $root.google.protobuf.Timestamp.fromObject(object.timestamp);
        }
        if (object.price != null)
            message.price = String(object.price);
        if (object.size != null)
            message.size = String(object.size);
        if (object.buyer != null)
            message.buyer = String(object.buyer);
        if (object.seller != null)
            message.seller = String(object.seller);
        return message;
    };

    /**
     * Creates a plain object from a Trade message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Trade
     * @static
     * @param {Trade} message Trade
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Trade.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.marketId = "";
            object.timestamp = null;
            object.price = "";
            object.size = "";
            object.buyer = "";
            object.seller = "";
        }
        if (message.marketId != null && message.hasOwnProperty("marketId"))
            object.marketId = message.marketId;
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            object.timestamp = $root.google.protobuf.Timestamp.toObject(message.timestamp, options);
        if (message.price != null && message.hasOwnProperty("price"))
            object.price = message.price;
        if (message.size != null && message.hasOwnProperty("size"))
            object.size = message.size;
        if (message.buyer != null && message.hasOwnProperty("buyer"))
            object.buyer = message.buyer;
        if (message.seller != null && message.hasOwnProperty("seller"))
            object.seller = message.seller;
        return object;
    };

    /**
     * Converts this Trade to JSON.
     * @function toJSON
     * @memberof Trade
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Trade.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Trade
     * @function getTypeUrl
     * @memberof Trade
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Trade.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Trade";
    };

    return Trade;
})();

$root.google = (function() {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    var google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        var protobuf = {};

        protobuf.Timestamp = (function() {

            /**
             * Properties of a Timestamp.
             * @memberof google.protobuf
             * @interface ITimestamp
             * @property {number|Long|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             */

            /**
             * Constructs a new Timestamp.
             * @memberof google.protobuf
             * @classdesc Represents a Timestamp.
             * @implements ITimestamp
             * @constructor
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             */
            function Timestamp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Timestamp seconds.
             * @member {number|Long} seconds
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.nanos = 0;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             * @returns {google.protobuf.Timestamp} Timestamp instance
             */
            Timestamp.create = function create(properties) {
                return new Timestamp(properties);
            };

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seconds != null && Object.hasOwnProperty.call(message, "seconds"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && Object.hasOwnProperty.call(message, "nanos"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                return writer;
            };

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Timestamp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.seconds = reader.int64();
                            break;
                        }
                    case 2: {
                            message.nanos = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Timestamp message.
             * @function verify
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Timestamp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Timestamp} Timestamp
             */
            Timestamp.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Timestamp)
                    return object;
                var message = new $root.google.protobuf.Timestamp();
                if (object.seconds != null)
                    if ($util.Long)
                        (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                    else if (typeof object.seconds === "string")
                        message.seconds = parseInt(object.seconds, 10);
                    else if (typeof object.seconds === "number")
                        message.seconds = object.seconds;
                    else if (typeof object.seconds === "object")
                        message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp} message Timestamp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Timestamp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seconds = options.longs === String ? "0" : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (typeof message.seconds === "number")
                        object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Timestamp to JSON.
             * @function toJSON
             * @memberof google.protobuf.Timestamp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Timestamp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Timestamp
             * @function getTypeUrl
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Timestamp.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/google.protobuf.Timestamp";
            };

            return Timestamp;
        })();

        return protobuf;
    })();

    return google;
})();

$root.Order = (function() {

    /**
     * Properties of an Order.
     * @exports IOrder
     * @interface IOrder
     * @property {string|null} [id] Order id
     * @property {string|null} [marketId] Order marketId
     * @property {string|null} [ownerId] Order ownerId
     * @property {google.protobuf.ITimestamp|null} [createdAt] Order createdAt
     * @property {string|null} [price] Order price
     * @property {string|null} [size] Order size
     * @property {Order.Side|null} [side] Order side
     */

    /**
     * Constructs a new Order.
     * @exports Order
     * @classdesc Represents an Order.
     * @implements IOrder
     * @constructor
     * @param {IOrder=} [properties] Properties to set
     */
    function Order(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Order id.
     * @member {string} id
     * @memberof Order
     * @instance
     */
    Order.prototype.id = "";

    /**
     * Order marketId.
     * @member {string} marketId
     * @memberof Order
     * @instance
     */
    Order.prototype.marketId = "";

    /**
     * Order ownerId.
     * @member {string} ownerId
     * @memberof Order
     * @instance
     */
    Order.prototype.ownerId = "";

    /**
     * Order createdAt.
     * @member {google.protobuf.ITimestamp|null|undefined} createdAt
     * @memberof Order
     * @instance
     */
    Order.prototype.createdAt = null;

    /**
     * Order price.
     * @member {string} price
     * @memberof Order
     * @instance
     */
    Order.prototype.price = "";

    /**
     * Order size.
     * @member {string} size
     * @memberof Order
     * @instance
     */
    Order.prototype.size = "";

    /**
     * Order side.
     * @member {Order.Side} side
     * @memberof Order
     * @instance
     */
    Order.prototype.side = 0;

    /**
     * Creates a new Order instance using the specified properties.
     * @function create
     * @memberof Order
     * @static
     * @param {IOrder=} [properties] Properties to set
     * @returns {Order} Order instance
     */
    Order.create = function create(properties) {
        return new Order(properties);
    };

    /**
     * Encodes the specified Order message. Does not implicitly {@link Order.verify|verify} messages.
     * @function encode
     * @memberof Order
     * @static
     * @param {IOrder} message Order message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Order.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
        if (message.marketId != null && Object.hasOwnProperty.call(message, "marketId"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.marketId);
        if (message.ownerId != null && Object.hasOwnProperty.call(message, "ownerId"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.ownerId);
        if (message.createdAt != null && Object.hasOwnProperty.call(message, "createdAt"))
            $root.google.protobuf.Timestamp.encode(message.createdAt, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.price != null && Object.hasOwnProperty.call(message, "price"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.price);
        if (message.size != null && Object.hasOwnProperty.call(message, "size"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.size);
        if (message.side != null && Object.hasOwnProperty.call(message, "side"))
            writer.uint32(/* id 7, wireType 0 =*/56).int32(message.side);
        return writer;
    };

    /**
     * Encodes the specified Order message, length delimited. Does not implicitly {@link Order.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Order
     * @static
     * @param {IOrder} message Order message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Order.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Order message from the specified reader or buffer.
     * @function decode
     * @memberof Order
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Order} Order
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Order.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Order();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.id = reader.string();
                    break;
                }
            case 2: {
                    message.marketId = reader.string();
                    break;
                }
            case 3: {
                    message.ownerId = reader.string();
                    break;
                }
            case 4: {
                    message.createdAt = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                    break;
                }
            case 5: {
                    message.price = reader.string();
                    break;
                }
            case 6: {
                    message.size = reader.string();
                    break;
                }
            case 7: {
                    message.side = reader.int32();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Order message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Order
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Order} Order
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Order.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Order message.
     * @function verify
     * @memberof Order
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Order.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isString(message.id))
                return "id: string expected";
        if (message.marketId != null && message.hasOwnProperty("marketId"))
            if (!$util.isString(message.marketId))
                return "marketId: string expected";
        if (message.ownerId != null && message.hasOwnProperty("ownerId"))
            if (!$util.isString(message.ownerId))
                return "ownerId: string expected";
        if (message.createdAt != null && message.hasOwnProperty("createdAt")) {
            var error = $root.google.protobuf.Timestamp.verify(message.createdAt);
            if (error)
                return "createdAt." + error;
        }
        if (message.price != null && message.hasOwnProperty("price"))
            if (!$util.isString(message.price))
                return "price: string expected";
        if (message.size != null && message.hasOwnProperty("size"))
            if (!$util.isString(message.size))
                return "size: string expected";
        if (message.side != null && message.hasOwnProperty("side"))
            switch (message.side) {
            default:
                return "side: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        return null;
    };

    /**
     * Creates an Order message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Order
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Order} Order
     */
    Order.fromObject = function fromObject(object) {
        if (object instanceof $root.Order)
            return object;
        var message = new $root.Order();
        if (object.id != null)
            message.id = String(object.id);
        if (object.marketId != null)
            message.marketId = String(object.marketId);
        if (object.ownerId != null)
            message.ownerId = String(object.ownerId);
        if (object.createdAt != null) {
            if (typeof object.createdAt !== "object")
                throw TypeError(".Order.createdAt: object expected");
            message.createdAt = $root.google.protobuf.Timestamp.fromObject(object.createdAt);
        }
        if (object.price != null)
            message.price = String(object.price);
        if (object.size != null)
            message.size = String(object.size);
        switch (object.side) {
        default:
            if (typeof object.side === "number") {
                message.side = object.side;
                break;
            }
            break;
        case "UNKNOWN":
        case 0:
            message.side = 0;
            break;
        case "BID":
        case 1:
            message.side = 1;
            break;
        case "OFFER":
        case 2:
            message.side = 2;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from an Order message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Order
     * @static
     * @param {Order} message Order
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Order.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.id = "";
            object.marketId = "";
            object.ownerId = "";
            object.createdAt = null;
            object.price = "";
            object.size = "";
            object.side = options.enums === String ? "UNKNOWN" : 0;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.marketId != null && message.hasOwnProperty("marketId"))
            object.marketId = message.marketId;
        if (message.ownerId != null && message.hasOwnProperty("ownerId"))
            object.ownerId = message.ownerId;
        if (message.createdAt != null && message.hasOwnProperty("createdAt"))
            object.createdAt = $root.google.protobuf.Timestamp.toObject(message.createdAt, options);
        if (message.price != null && message.hasOwnProperty("price"))
            object.price = message.price;
        if (message.size != null && message.hasOwnProperty("size"))
            object.size = message.size;
        if (message.side != null && message.hasOwnProperty("side"))
            object.side = options.enums === String ? $root.Order.Side[message.side] === undefined ? message.side : $root.Order.Side[message.side] : message.side;
        return object;
    };

    /**
     * Converts this Order to JSON.
     * @function toJSON
     * @memberof Order
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Order.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Order
     * @function getTypeUrl
     * @memberof Order
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Order.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Order";
    };

    /**
     * Side enum.
     * @name Order.Side
     * @enum {number}
     * @property {number} UNKNOWN=0 UNKNOWN value
     * @property {number} BID=1 BID value
     * @property {number} OFFER=2 OFFER value
     */
    Order.Side = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN"] = 0;
        values[valuesById[1] = "BID"] = 1;
        values[valuesById[2] = "OFFER"] = 2;
        return values;
    })();

    return Order;
})();

$root.MarketSettled = (function() {

    /**
     * Properties of a MarketSettled.
     * @exports IMarketSettled
     * @interface IMarketSettled
     * @property {string|null} [id] MarketSettled id
     * @property {string|null} [settlePrice] MarketSettled settlePrice
     */

    /**
     * Constructs a new MarketSettled.
     * @exports MarketSettled
     * @classdesc Represents a MarketSettled.
     * @implements IMarketSettled
     * @constructor
     * @param {IMarketSettled=} [properties] Properties to set
     */
    function MarketSettled(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MarketSettled id.
     * @member {string} id
     * @memberof MarketSettled
     * @instance
     */
    MarketSettled.prototype.id = "";

    /**
     * MarketSettled settlePrice.
     * @member {string} settlePrice
     * @memberof MarketSettled
     * @instance
     */
    MarketSettled.prototype.settlePrice = "";

    /**
     * Creates a new MarketSettled instance using the specified properties.
     * @function create
     * @memberof MarketSettled
     * @static
     * @param {IMarketSettled=} [properties] Properties to set
     * @returns {MarketSettled} MarketSettled instance
     */
    MarketSettled.create = function create(properties) {
        return new MarketSettled(properties);
    };

    /**
     * Encodes the specified MarketSettled message. Does not implicitly {@link MarketSettled.verify|verify} messages.
     * @function encode
     * @memberof MarketSettled
     * @static
     * @param {IMarketSettled} message MarketSettled message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MarketSettled.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
        if (message.settlePrice != null && Object.hasOwnProperty.call(message, "settlePrice"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.settlePrice);
        return writer;
    };

    /**
     * Encodes the specified MarketSettled message, length delimited. Does not implicitly {@link MarketSettled.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MarketSettled
     * @static
     * @param {IMarketSettled} message MarketSettled message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MarketSettled.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MarketSettled message from the specified reader or buffer.
     * @function decode
     * @memberof MarketSettled
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MarketSettled} MarketSettled
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MarketSettled.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MarketSettled();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.id = reader.string();
                    break;
                }
            case 2: {
                    message.settlePrice = reader.string();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MarketSettled message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MarketSettled
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MarketSettled} MarketSettled
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MarketSettled.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MarketSettled message.
     * @function verify
     * @memberof MarketSettled
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MarketSettled.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isString(message.id))
                return "id: string expected";
        if (message.settlePrice != null && message.hasOwnProperty("settlePrice"))
            if (!$util.isString(message.settlePrice))
                return "settlePrice: string expected";
        return null;
    };

    /**
     * Creates a MarketSettled message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MarketSettled
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MarketSettled} MarketSettled
     */
    MarketSettled.fromObject = function fromObject(object) {
        if (object instanceof $root.MarketSettled)
            return object;
        var message = new $root.MarketSettled();
        if (object.id != null)
            message.id = String(object.id);
        if (object.settlePrice != null)
            message.settlePrice = String(object.settlePrice);
        return message;
    };

    /**
     * Creates a plain object from a MarketSettled message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MarketSettled
     * @static
     * @param {MarketSettled} message MarketSettled
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MarketSettled.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.id = "";
            object.settlePrice = "";
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.settlePrice != null && message.hasOwnProperty("settlePrice"))
            object.settlePrice = message.settlePrice;
        return object;
    };

    /**
     * Converts this MarketSettled to JSON.
     * @function toJSON
     * @memberof MarketSettled
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MarketSettled.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for MarketSettled
     * @function getTypeUrl
     * @memberof MarketSettled
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    MarketSettled.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/MarketSettled";
    };

    return MarketSettled;
})();

$root.OrderCancelled = (function() {

    /**
     * Properties of an OrderCancelled.
     * @exports IOrderCancelled
     * @interface IOrderCancelled
     * @property {string|null} [id] OrderCancelled id
     * @property {string|null} [marketId] OrderCancelled marketId
     */

    /**
     * Constructs a new OrderCancelled.
     * @exports OrderCancelled
     * @classdesc Represents an OrderCancelled.
     * @implements IOrderCancelled
     * @constructor
     * @param {IOrderCancelled=} [properties] Properties to set
     */
    function OrderCancelled(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * OrderCancelled id.
     * @member {string} id
     * @memberof OrderCancelled
     * @instance
     */
    OrderCancelled.prototype.id = "";

    /**
     * OrderCancelled marketId.
     * @member {string} marketId
     * @memberof OrderCancelled
     * @instance
     */
    OrderCancelled.prototype.marketId = "";

    /**
     * Creates a new OrderCancelled instance using the specified properties.
     * @function create
     * @memberof OrderCancelled
     * @static
     * @param {IOrderCancelled=} [properties] Properties to set
     * @returns {OrderCancelled} OrderCancelled instance
     */
    OrderCancelled.create = function create(properties) {
        return new OrderCancelled(properties);
    };

    /**
     * Encodes the specified OrderCancelled message. Does not implicitly {@link OrderCancelled.verify|verify} messages.
     * @function encode
     * @memberof OrderCancelled
     * @static
     * @param {IOrderCancelled} message OrderCancelled message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    OrderCancelled.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
        if (message.marketId != null && Object.hasOwnProperty.call(message, "marketId"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.marketId);
        return writer;
    };

    /**
     * Encodes the specified OrderCancelled message, length delimited. Does not implicitly {@link OrderCancelled.verify|verify} messages.
     * @function encodeDelimited
     * @memberof OrderCancelled
     * @static
     * @param {IOrderCancelled} message OrderCancelled message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    OrderCancelled.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an OrderCancelled message from the specified reader or buffer.
     * @function decode
     * @memberof OrderCancelled
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {OrderCancelled} OrderCancelled
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    OrderCancelled.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.OrderCancelled();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.id = reader.string();
                    break;
                }
            case 2: {
                    message.marketId = reader.string();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an OrderCancelled message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof OrderCancelled
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {OrderCancelled} OrderCancelled
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    OrderCancelled.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an OrderCancelled message.
     * @function verify
     * @memberof OrderCancelled
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    OrderCancelled.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isString(message.id))
                return "id: string expected";
        if (message.marketId != null && message.hasOwnProperty("marketId"))
            if (!$util.isString(message.marketId))
                return "marketId: string expected";
        return null;
    };

    /**
     * Creates an OrderCancelled message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof OrderCancelled
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {OrderCancelled} OrderCancelled
     */
    OrderCancelled.fromObject = function fromObject(object) {
        if (object instanceof $root.OrderCancelled)
            return object;
        var message = new $root.OrderCancelled();
        if (object.id != null)
            message.id = String(object.id);
        if (object.marketId != null)
            message.marketId = String(object.marketId);
        return message;
    };

    /**
     * Creates a plain object from an OrderCancelled message. Also converts values to other types if specified.
     * @function toObject
     * @memberof OrderCancelled
     * @static
     * @param {OrderCancelled} message OrderCancelled
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    OrderCancelled.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.id = "";
            object.marketId = "";
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.marketId != null && message.hasOwnProperty("marketId"))
            object.marketId = message.marketId;
        return object;
    };

    /**
     * Converts this OrderCancelled to JSON.
     * @function toJSON
     * @memberof OrderCancelled
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    OrderCancelled.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for OrderCancelled
     * @function getTypeUrl
     * @memberof OrderCancelled
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    OrderCancelled.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/OrderCancelled";
    };

    return OrderCancelled;
})();

$root.OrderFilled = (function() {

    /**
     * Properties of an OrderFilled.
     * @exports IOrderFilled
     * @interface IOrderFilled
     * @property {string|null} [id] OrderFilled id
     * @property {string|null} [marketId] OrderFilled marketId
     * @property {OrderFilled.IFull|null} [full] OrderFilled full
     * @property {OrderFilled.IPartialFillDetails|null} [partial] OrderFilled partial
     */

    /**
     * Constructs a new OrderFilled.
     * @exports OrderFilled
     * @classdesc Represents an OrderFilled.
     * @implements IOrderFilled
     * @constructor
     * @param {IOrderFilled=} [properties] Properties to set
     */
    function OrderFilled(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * OrderFilled id.
     * @member {string} id
     * @memberof OrderFilled
     * @instance
     */
    OrderFilled.prototype.id = "";

    /**
     * OrderFilled marketId.
     * @member {string} marketId
     * @memberof OrderFilled
     * @instance
     */
    OrderFilled.prototype.marketId = "";

    /**
     * OrderFilled full.
     * @member {OrderFilled.IFull|null|undefined} full
     * @memberof OrderFilled
     * @instance
     */
    OrderFilled.prototype.full = null;

    /**
     * OrderFilled partial.
     * @member {OrderFilled.IPartialFillDetails|null|undefined} partial
     * @memberof OrderFilled
     * @instance
     */
    OrderFilled.prototype.partial = null;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * OrderFilled fillKind.
     * @member {"full"|"partial"|undefined} fillKind
     * @memberof OrderFilled
     * @instance
     */
    Object.defineProperty(OrderFilled.prototype, "fillKind", {
        get: $util.oneOfGetter($oneOfFields = ["full", "partial"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new OrderFilled instance using the specified properties.
     * @function create
     * @memberof OrderFilled
     * @static
     * @param {IOrderFilled=} [properties] Properties to set
     * @returns {OrderFilled} OrderFilled instance
     */
    OrderFilled.create = function create(properties) {
        return new OrderFilled(properties);
    };

    /**
     * Encodes the specified OrderFilled message. Does not implicitly {@link OrderFilled.verify|verify} messages.
     * @function encode
     * @memberof OrderFilled
     * @static
     * @param {IOrderFilled} message OrderFilled message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    OrderFilled.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
        if (message.marketId != null && Object.hasOwnProperty.call(message, "marketId"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.marketId);
        if (message.full != null && Object.hasOwnProperty.call(message, "full"))
            $root.OrderFilled.Full.encode(message.full, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.partial != null && Object.hasOwnProperty.call(message, "partial"))
            $root.OrderFilled.PartialFillDetails.encode(message.partial, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified OrderFilled message, length delimited. Does not implicitly {@link OrderFilled.verify|verify} messages.
     * @function encodeDelimited
     * @memberof OrderFilled
     * @static
     * @param {IOrderFilled} message OrderFilled message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    OrderFilled.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an OrderFilled message from the specified reader or buffer.
     * @function decode
     * @memberof OrderFilled
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {OrderFilled} OrderFilled
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    OrderFilled.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.OrderFilled();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.id = reader.string();
                    break;
                }
            case 2: {
                    message.marketId = reader.string();
                    break;
                }
            case 3: {
                    message.full = $root.OrderFilled.Full.decode(reader, reader.uint32());
                    break;
                }
            case 4: {
                    message.partial = $root.OrderFilled.PartialFillDetails.decode(reader, reader.uint32());
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an OrderFilled message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof OrderFilled
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {OrderFilled} OrderFilled
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    OrderFilled.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an OrderFilled message.
     * @function verify
     * @memberof OrderFilled
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    OrderFilled.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isString(message.id))
                return "id: string expected";
        if (message.marketId != null && message.hasOwnProperty("marketId"))
            if (!$util.isString(message.marketId))
                return "marketId: string expected";
        if (message.full != null && message.hasOwnProperty("full")) {
            properties.fillKind = 1;
            {
                var error = $root.OrderFilled.Full.verify(message.full);
                if (error)
                    return "full." + error;
            }
        }
        if (message.partial != null && message.hasOwnProperty("partial")) {
            if (properties.fillKind === 1)
                return "fillKind: multiple values";
            properties.fillKind = 1;
            {
                var error = $root.OrderFilled.PartialFillDetails.verify(message.partial);
                if (error)
                    return "partial." + error;
            }
        }
        return null;
    };

    /**
     * Creates an OrderFilled message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof OrderFilled
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {OrderFilled} OrderFilled
     */
    OrderFilled.fromObject = function fromObject(object) {
        if (object instanceof $root.OrderFilled)
            return object;
        var message = new $root.OrderFilled();
        if (object.id != null)
            message.id = String(object.id);
        if (object.marketId != null)
            message.marketId = String(object.marketId);
        if (object.full != null) {
            if (typeof object.full !== "object")
                throw TypeError(".OrderFilled.full: object expected");
            message.full = $root.OrderFilled.Full.fromObject(object.full);
        }
        if (object.partial != null) {
            if (typeof object.partial !== "object")
                throw TypeError(".OrderFilled.partial: object expected");
            message.partial = $root.OrderFilled.PartialFillDetails.fromObject(object.partial);
        }
        return message;
    };

    /**
     * Creates a plain object from an OrderFilled message. Also converts values to other types if specified.
     * @function toObject
     * @memberof OrderFilled
     * @static
     * @param {OrderFilled} message OrderFilled
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    OrderFilled.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.id = "";
            object.marketId = "";
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.marketId != null && message.hasOwnProperty("marketId"))
            object.marketId = message.marketId;
        if (message.full != null && message.hasOwnProperty("full")) {
            object.full = $root.OrderFilled.Full.toObject(message.full, options);
            if (options.oneofs)
                object.fillKind = "full";
        }
        if (message.partial != null && message.hasOwnProperty("partial")) {
            object.partial = $root.OrderFilled.PartialFillDetails.toObject(message.partial, options);
            if (options.oneofs)
                object.fillKind = "partial";
        }
        return object;
    };

    /**
     * Converts this OrderFilled to JSON.
     * @function toJSON
     * @memberof OrderFilled
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    OrderFilled.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for OrderFilled
     * @function getTypeUrl
     * @memberof OrderFilled
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    OrderFilled.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/OrderFilled";
    };

    OrderFilled.Full = (function() {

        /**
         * Properties of a Full.
         * @memberof OrderFilled
         * @interface IFull
         */

        /**
         * Constructs a new Full.
         * @memberof OrderFilled
         * @classdesc Represents a Full.
         * @implements IFull
         * @constructor
         * @param {OrderFilled.IFull=} [properties] Properties to set
         */
        function Full(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Full instance using the specified properties.
         * @function create
         * @memberof OrderFilled.Full
         * @static
         * @param {OrderFilled.IFull=} [properties] Properties to set
         * @returns {OrderFilled.Full} Full instance
         */
        Full.create = function create(properties) {
            return new Full(properties);
        };

        /**
         * Encodes the specified Full message. Does not implicitly {@link OrderFilled.Full.verify|verify} messages.
         * @function encode
         * @memberof OrderFilled.Full
         * @static
         * @param {OrderFilled.IFull} message Full message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Full.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Full message, length delimited. Does not implicitly {@link OrderFilled.Full.verify|verify} messages.
         * @function encodeDelimited
         * @memberof OrderFilled.Full
         * @static
         * @param {OrderFilled.IFull} message Full message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Full.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Full message from the specified reader or buffer.
         * @function decode
         * @memberof OrderFilled.Full
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {OrderFilled.Full} Full
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Full.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.OrderFilled.Full();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Full message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof OrderFilled.Full
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {OrderFilled.Full} Full
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Full.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Full message.
         * @function verify
         * @memberof OrderFilled.Full
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Full.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Full message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof OrderFilled.Full
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {OrderFilled.Full} Full
         */
        Full.fromObject = function fromObject(object) {
            if (object instanceof $root.OrderFilled.Full)
                return object;
            return new $root.OrderFilled.Full();
        };

        /**
         * Creates a plain object from a Full message. Also converts values to other types if specified.
         * @function toObject
         * @memberof OrderFilled.Full
         * @static
         * @param {OrderFilled.Full} message Full
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Full.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Full to JSON.
         * @function toJSON
         * @memberof OrderFilled.Full
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Full.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Full
         * @function getTypeUrl
         * @memberof OrderFilled.Full
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Full.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/OrderFilled.Full";
        };

        return Full;
    })();

    OrderFilled.PartialFillDetails = (function() {

        /**
         * Properties of a PartialFillDetails.
         * @memberof OrderFilled
         * @interface IPartialFillDetails
         * @property {string|null} [sizeFilled] PartialFillDetails sizeFilled
         * @property {string|null} [sizeRemaining] PartialFillDetails sizeRemaining
         */

        /**
         * Constructs a new PartialFillDetails.
         * @memberof OrderFilled
         * @classdesc Represents a PartialFillDetails.
         * @implements IPartialFillDetails
         * @constructor
         * @param {OrderFilled.IPartialFillDetails=} [properties] Properties to set
         */
        function PartialFillDetails(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PartialFillDetails sizeFilled.
         * @member {string} sizeFilled
         * @memberof OrderFilled.PartialFillDetails
         * @instance
         */
        PartialFillDetails.prototype.sizeFilled = "";

        /**
         * PartialFillDetails sizeRemaining.
         * @member {string} sizeRemaining
         * @memberof OrderFilled.PartialFillDetails
         * @instance
         */
        PartialFillDetails.prototype.sizeRemaining = "";

        /**
         * Creates a new PartialFillDetails instance using the specified properties.
         * @function create
         * @memberof OrderFilled.PartialFillDetails
         * @static
         * @param {OrderFilled.IPartialFillDetails=} [properties] Properties to set
         * @returns {OrderFilled.PartialFillDetails} PartialFillDetails instance
         */
        PartialFillDetails.create = function create(properties) {
            return new PartialFillDetails(properties);
        };

        /**
         * Encodes the specified PartialFillDetails message. Does not implicitly {@link OrderFilled.PartialFillDetails.verify|verify} messages.
         * @function encode
         * @memberof OrderFilled.PartialFillDetails
         * @static
         * @param {OrderFilled.IPartialFillDetails} message PartialFillDetails message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PartialFillDetails.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.sizeFilled != null && Object.hasOwnProperty.call(message, "sizeFilled"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.sizeFilled);
            if (message.sizeRemaining != null && Object.hasOwnProperty.call(message, "sizeRemaining"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.sizeRemaining);
            return writer;
        };

        /**
         * Encodes the specified PartialFillDetails message, length delimited. Does not implicitly {@link OrderFilled.PartialFillDetails.verify|verify} messages.
         * @function encodeDelimited
         * @memberof OrderFilled.PartialFillDetails
         * @static
         * @param {OrderFilled.IPartialFillDetails} message PartialFillDetails message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PartialFillDetails.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PartialFillDetails message from the specified reader or buffer.
         * @function decode
         * @memberof OrderFilled.PartialFillDetails
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {OrderFilled.PartialFillDetails} PartialFillDetails
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PartialFillDetails.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.OrderFilled.PartialFillDetails();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.sizeFilled = reader.string();
                        break;
                    }
                case 2: {
                        message.sizeRemaining = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PartialFillDetails message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof OrderFilled.PartialFillDetails
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {OrderFilled.PartialFillDetails} PartialFillDetails
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PartialFillDetails.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PartialFillDetails message.
         * @function verify
         * @memberof OrderFilled.PartialFillDetails
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PartialFillDetails.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.sizeFilled != null && message.hasOwnProperty("sizeFilled"))
                if (!$util.isString(message.sizeFilled))
                    return "sizeFilled: string expected";
            if (message.sizeRemaining != null && message.hasOwnProperty("sizeRemaining"))
                if (!$util.isString(message.sizeRemaining))
                    return "sizeRemaining: string expected";
            return null;
        };

        /**
         * Creates a PartialFillDetails message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof OrderFilled.PartialFillDetails
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {OrderFilled.PartialFillDetails} PartialFillDetails
         */
        PartialFillDetails.fromObject = function fromObject(object) {
            if (object instanceof $root.OrderFilled.PartialFillDetails)
                return object;
            var message = new $root.OrderFilled.PartialFillDetails();
            if (object.sizeFilled != null)
                message.sizeFilled = String(object.sizeFilled);
            if (object.sizeRemaining != null)
                message.sizeRemaining = String(object.sizeRemaining);
            return message;
        };

        /**
         * Creates a plain object from a PartialFillDetails message. Also converts values to other types if specified.
         * @function toObject
         * @memberof OrderFilled.PartialFillDetails
         * @static
         * @param {OrderFilled.PartialFillDetails} message PartialFillDetails
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PartialFillDetails.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.sizeFilled = "";
                object.sizeRemaining = "";
            }
            if (message.sizeFilled != null && message.hasOwnProperty("sizeFilled"))
                object.sizeFilled = message.sizeFilled;
            if (message.sizeRemaining != null && message.hasOwnProperty("sizeRemaining"))
                object.sizeRemaining = message.sizeRemaining;
            return object;
        };

        /**
         * Converts this PartialFillDetails to JSON.
         * @function toJSON
         * @memberof OrderFilled.PartialFillDetails
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PartialFillDetails.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PartialFillDetails
         * @function getTypeUrl
         * @memberof OrderFilled.PartialFillDetails
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PartialFillDetails.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/OrderFilled.PartialFillDetails";
        };

        return PartialFillDetails;
    })();

    return OrderFilled;
})();

$root.RequestFailed = (function() {

    /**
     * Properties of a RequestFailed.
     * @exports IRequestFailed
     * @interface IRequestFailed
     * @property {RequestFailed.IRequestDetails|null} [requestDetails] RequestFailed requestDetails
     * @property {RequestFailed.IErrorDetails|null} [errorDetails] RequestFailed errorDetails
     */

    /**
     * Constructs a new RequestFailed.
     * @exports RequestFailed
     * @classdesc Represents a RequestFailed.
     * @implements IRequestFailed
     * @constructor
     * @param {IRequestFailed=} [properties] Properties to set
     */
    function RequestFailed(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RequestFailed requestDetails.
     * @member {RequestFailed.IRequestDetails|null|undefined} requestDetails
     * @memberof RequestFailed
     * @instance
     */
    RequestFailed.prototype.requestDetails = null;

    /**
     * RequestFailed errorDetails.
     * @member {RequestFailed.IErrorDetails|null|undefined} errorDetails
     * @memberof RequestFailed
     * @instance
     */
    RequestFailed.prototype.errorDetails = null;

    /**
     * Creates a new RequestFailed instance using the specified properties.
     * @function create
     * @memberof RequestFailed
     * @static
     * @param {IRequestFailed=} [properties] Properties to set
     * @returns {RequestFailed} RequestFailed instance
     */
    RequestFailed.create = function create(properties) {
        return new RequestFailed(properties);
    };

    /**
     * Encodes the specified RequestFailed message. Does not implicitly {@link RequestFailed.verify|verify} messages.
     * @function encode
     * @memberof RequestFailed
     * @static
     * @param {IRequestFailed} message RequestFailed message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RequestFailed.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.requestDetails != null && Object.hasOwnProperty.call(message, "requestDetails"))
            $root.RequestFailed.RequestDetails.encode(message.requestDetails, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.errorDetails != null && Object.hasOwnProperty.call(message, "errorDetails"))
            $root.RequestFailed.ErrorDetails.encode(message.errorDetails, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified RequestFailed message, length delimited. Does not implicitly {@link RequestFailed.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RequestFailed
     * @static
     * @param {IRequestFailed} message RequestFailed message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RequestFailed.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RequestFailed message from the specified reader or buffer.
     * @function decode
     * @memberof RequestFailed
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RequestFailed} RequestFailed
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RequestFailed.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RequestFailed();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.requestDetails = $root.RequestFailed.RequestDetails.decode(reader, reader.uint32());
                    break;
                }
            case 2: {
                    message.errorDetails = $root.RequestFailed.ErrorDetails.decode(reader, reader.uint32());
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RequestFailed message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RequestFailed
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RequestFailed} RequestFailed
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RequestFailed.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RequestFailed message.
     * @function verify
     * @memberof RequestFailed
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RequestFailed.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.requestDetails != null && message.hasOwnProperty("requestDetails")) {
            var error = $root.RequestFailed.RequestDetails.verify(message.requestDetails);
            if (error)
                return "requestDetails." + error;
        }
        if (message.errorDetails != null && message.hasOwnProperty("errorDetails")) {
            var error = $root.RequestFailed.ErrorDetails.verify(message.errorDetails);
            if (error)
                return "errorDetails." + error;
        }
        return null;
    };

    /**
     * Creates a RequestFailed message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RequestFailed
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RequestFailed} RequestFailed
     */
    RequestFailed.fromObject = function fromObject(object) {
        if (object instanceof $root.RequestFailed)
            return object;
        var message = new $root.RequestFailed();
        if (object.requestDetails != null) {
            if (typeof object.requestDetails !== "object")
                throw TypeError(".RequestFailed.requestDetails: object expected");
            message.requestDetails = $root.RequestFailed.RequestDetails.fromObject(object.requestDetails);
        }
        if (object.errorDetails != null) {
            if (typeof object.errorDetails !== "object")
                throw TypeError(".RequestFailed.errorDetails: object expected");
            message.errorDetails = $root.RequestFailed.ErrorDetails.fromObject(object.errorDetails);
        }
        return message;
    };

    /**
     * Creates a plain object from a RequestFailed message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RequestFailed
     * @static
     * @param {RequestFailed} message RequestFailed
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RequestFailed.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.requestDetails = null;
            object.errorDetails = null;
        }
        if (message.requestDetails != null && message.hasOwnProperty("requestDetails"))
            object.requestDetails = $root.RequestFailed.RequestDetails.toObject(message.requestDetails, options);
        if (message.errorDetails != null && message.hasOwnProperty("errorDetails"))
            object.errorDetails = $root.RequestFailed.ErrorDetails.toObject(message.errorDetails, options);
        return object;
    };

    /**
     * Converts this RequestFailed to JSON.
     * @function toJSON
     * @memberof RequestFailed
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RequestFailed.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for RequestFailed
     * @function getTypeUrl
     * @memberof RequestFailed
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    RequestFailed.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/RequestFailed";
    };

    RequestFailed.RequestDetails = (function() {

        /**
         * Properties of a RequestDetails.
         * @memberof RequestFailed
         * @interface IRequestDetails
         * @property {string|null} [kind] RequestDetails kind
         */

        /**
         * Constructs a new RequestDetails.
         * @memberof RequestFailed
         * @classdesc Represents a RequestDetails.
         * @implements IRequestDetails
         * @constructor
         * @param {RequestFailed.IRequestDetails=} [properties] Properties to set
         */
        function RequestDetails(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RequestDetails kind.
         * @member {string} kind
         * @memberof RequestFailed.RequestDetails
         * @instance
         */
        RequestDetails.prototype.kind = "";

        /**
         * Creates a new RequestDetails instance using the specified properties.
         * @function create
         * @memberof RequestFailed.RequestDetails
         * @static
         * @param {RequestFailed.IRequestDetails=} [properties] Properties to set
         * @returns {RequestFailed.RequestDetails} RequestDetails instance
         */
        RequestDetails.create = function create(properties) {
            return new RequestDetails(properties);
        };

        /**
         * Encodes the specified RequestDetails message. Does not implicitly {@link RequestFailed.RequestDetails.verify|verify} messages.
         * @function encode
         * @memberof RequestFailed.RequestDetails
         * @static
         * @param {RequestFailed.IRequestDetails} message RequestDetails message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RequestDetails.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.kind != null && Object.hasOwnProperty.call(message, "kind"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.kind);
            return writer;
        };

        /**
         * Encodes the specified RequestDetails message, length delimited. Does not implicitly {@link RequestFailed.RequestDetails.verify|verify} messages.
         * @function encodeDelimited
         * @memberof RequestFailed.RequestDetails
         * @static
         * @param {RequestFailed.IRequestDetails} message RequestDetails message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RequestDetails.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RequestDetails message from the specified reader or buffer.
         * @function decode
         * @memberof RequestFailed.RequestDetails
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {RequestFailed.RequestDetails} RequestDetails
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RequestDetails.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RequestFailed.RequestDetails();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.kind = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RequestDetails message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof RequestFailed.RequestDetails
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {RequestFailed.RequestDetails} RequestDetails
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RequestDetails.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RequestDetails message.
         * @function verify
         * @memberof RequestFailed.RequestDetails
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RequestDetails.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.kind != null && message.hasOwnProperty("kind"))
                if (!$util.isString(message.kind))
                    return "kind: string expected";
            return null;
        };

        /**
         * Creates a RequestDetails message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof RequestFailed.RequestDetails
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {RequestFailed.RequestDetails} RequestDetails
         */
        RequestDetails.fromObject = function fromObject(object) {
            if (object instanceof $root.RequestFailed.RequestDetails)
                return object;
            var message = new $root.RequestFailed.RequestDetails();
            if (object.kind != null)
                message.kind = String(object.kind);
            return message;
        };

        /**
         * Creates a plain object from a RequestDetails message. Also converts values to other types if specified.
         * @function toObject
         * @memberof RequestFailed.RequestDetails
         * @static
         * @param {RequestFailed.RequestDetails} message RequestDetails
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RequestDetails.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.kind = "";
            if (message.kind != null && message.hasOwnProperty("kind"))
                object.kind = message.kind;
            return object;
        };

        /**
         * Converts this RequestDetails to JSON.
         * @function toJSON
         * @memberof RequestFailed.RequestDetails
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RequestDetails.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RequestDetails
         * @function getTypeUrl
         * @memberof RequestFailed.RequestDetails
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RequestDetails.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/RequestFailed.RequestDetails";
        };

        return RequestDetails;
    })();

    RequestFailed.ErrorDetails = (function() {

        /**
         * Properties of an ErrorDetails.
         * @memberof RequestFailed
         * @interface IErrorDetails
         * @property {string|null} [message] ErrorDetails message
         */

        /**
         * Constructs a new ErrorDetails.
         * @memberof RequestFailed
         * @classdesc Represents an ErrorDetails.
         * @implements IErrorDetails
         * @constructor
         * @param {RequestFailed.IErrorDetails=} [properties] Properties to set
         */
        function ErrorDetails(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ErrorDetails message.
         * @member {string} message
         * @memberof RequestFailed.ErrorDetails
         * @instance
         */
        ErrorDetails.prototype.message = "";

        /**
         * Creates a new ErrorDetails instance using the specified properties.
         * @function create
         * @memberof RequestFailed.ErrorDetails
         * @static
         * @param {RequestFailed.IErrorDetails=} [properties] Properties to set
         * @returns {RequestFailed.ErrorDetails} ErrorDetails instance
         */
        ErrorDetails.create = function create(properties) {
            return new ErrorDetails(properties);
        };

        /**
         * Encodes the specified ErrorDetails message. Does not implicitly {@link RequestFailed.ErrorDetails.verify|verify} messages.
         * @function encode
         * @memberof RequestFailed.ErrorDetails
         * @static
         * @param {RequestFailed.IErrorDetails} message ErrorDetails message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ErrorDetails.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.message);
            return writer;
        };

        /**
         * Encodes the specified ErrorDetails message, length delimited. Does not implicitly {@link RequestFailed.ErrorDetails.verify|verify} messages.
         * @function encodeDelimited
         * @memberof RequestFailed.ErrorDetails
         * @static
         * @param {RequestFailed.IErrorDetails} message ErrorDetails message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ErrorDetails.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ErrorDetails message from the specified reader or buffer.
         * @function decode
         * @memberof RequestFailed.ErrorDetails
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {RequestFailed.ErrorDetails} ErrorDetails
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ErrorDetails.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RequestFailed.ErrorDetails();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.message = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ErrorDetails message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof RequestFailed.ErrorDetails
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {RequestFailed.ErrorDetails} ErrorDetails
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ErrorDetails.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ErrorDetails message.
         * @function verify
         * @memberof RequestFailed.ErrorDetails
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ErrorDetails.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            return null;
        };

        /**
         * Creates an ErrorDetails message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof RequestFailed.ErrorDetails
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {RequestFailed.ErrorDetails} ErrorDetails
         */
        ErrorDetails.fromObject = function fromObject(object) {
            if (object instanceof $root.RequestFailed.ErrorDetails)
                return object;
            var message = new $root.RequestFailed.ErrorDetails();
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from an ErrorDetails message. Also converts values to other types if specified.
         * @function toObject
         * @memberof RequestFailed.ErrorDetails
         * @static
         * @param {RequestFailed.ErrorDetails} message ErrorDetails
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ErrorDetails.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.message = "";
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this ErrorDetails to JSON.
         * @function toJSON
         * @memberof RequestFailed.ErrorDetails
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ErrorDetails.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ErrorDetails
         * @function getTypeUrl
         * @memberof RequestFailed.ErrorDetails
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ErrorDetails.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/RequestFailed.ErrorDetails";
        };

        return ErrorDetails;
    })();

    return RequestFailed;
})();

module.exports = $root;
