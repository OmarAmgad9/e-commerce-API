"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Features {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }
    // filter(){
    //     const queryStringObj = {...this.queryString}
    //     const executedFields: string[] = ['page', 'limit', 'sort', 'fields', 'search'];
    //     executedFields.forEach((fields:string):void => {
    //         delete queryStringObj[fields]
    //     });
    //     let queryStr: string = JSON.stringify(queryStringObj);
    //     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match=>`$${match}`)
    //     this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
    //     return this;
    // }
    filter() {
        const queryStringObj = Object.assign({}, this.queryString);
        const executedFields = ['page', 'limit', 'sort', 'fields', 'search'];
        executedFields.forEach((field) => {
            delete queryStringObj[field];
        });
        let queryStr = JSON.stringify(queryStringObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
        return this;
    }
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        }
        else {
            this.mongooseQuery = this.mongooseQuery.sort('-createdAt');
        }
        return this;
    }
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.select(fields);
        }
        return this;
    }
    search(ModelName) {
        if (this.queryString.search) {
            let query = {};
            if (ModelName == 'product') {
                query.$or = [
                    { name: new RegExp(this.queryString.search, 'i') },
                    { description: new RegExp(this.queryString.search, 'i') },
                ];
            }
            else {
                query = { name: new RegExp(this.queryString.search, 'i') };
            }
            this.mongooseQuery = this.mongooseQuery.find(query);
        }
        return this;
    }
    pagination(documentCount) {
        const page = this.queryString.page || 1;
        const limit = this.queryString.limit || 5;
        const skip = (page - 1) * limit;
        const endIndex = page * limit;
        const pagination = {};
        pagination.currentPage = Number(page);
        pagination.limit = Number(limit);
        pagination.totalPage = Math.ceil(documentCount / limit);
        if (endIndex < documentCount) {
            pagination.next = Number(page) + 1;
        }
        if (skip > 0) {
            pagination.prev = Number(page) - 1;
        }
        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
        this.paginationResult = pagination;
        return this;
    }
}
exports.default = Features;