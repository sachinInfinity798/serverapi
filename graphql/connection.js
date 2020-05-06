const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
var model = require("../models");

const loginUser_C = input => {
    return model.user.findOne({
        where: { email: input.email, password: input.password, status: '0' },
        include: [
            { model: model.aclpermission, attributes: ['aclResourceId'] },
            { model: model.location, attributes: ['name'] }]
    }).then((res) => {
        if (res) {

            return [{
                token: jwt.sign(
                    { id: res.id, email: res.email, name: res.userName },
                    jwtkey,
                    { expiresIn: '3d' }
                ),
                id: res.id,
                locationID: res.locationID,
                userName: res.userName,
                email: res.email,
                pwd: res.password,
                gender: res.gender,
                mobile: res.mobile,
                dob: res.dob,
                Address: res.Address,
                status: res.status,
                permission: res.aclpermission.aclResourceId,
                locationName: res.location.name
            }
            ];
        }
    }
    );
}

const updateUser_C = input => {
    let data = input.input;
    let obj = input.input;
    let Id = parseInt(input.input.id);
    delete data.id;
    return model.user.update(data, { where: { id: Id } }).then((res) => {
        if (res) {
            obj.id = Id;
            return obj;
        }
    })
}

const changePassword_C = input => {
    return model.user.update({ password: input.password }, { where: { id: input.id } }).then((res) => {
        if (res) {
            return { id: input.id };
        }
    })
}

const joblist_C = input => {
    return model.job.findAndCountAll({
        where: { locationID: input.locationId, isDeleted: '0' },
        include: [
            { model: model.location, attributes: ['name'] },
            { model: model.assigncontactlist, attributes: ['id'], include: [{ model: model.personlist, attributes: ['id', 'name', 'address', 'email', 'contactNumber', 'company'] }] }
        ]
    }).then((res) => {
        if (res) {
            return res.rows;

        }
    })
}

const personlist_C = input => {
    const Op = Sequelize.Op;
    let idarry = input.personId.split(",");
    return model.personlist.findAll({
        where: { id: { [Op.in]: idarry } }
    }).then((res) => {
        if (res) {
            return res;

        }
    })
}


const deleteperson_C = input => {
    let jobId = parseInt(input.JobId);
    let Id = parseInt(input.Id);
    return model.assigncontactlist.destroy({
        where: {
            personId: Id,
            jobId: jobId
        }
    }).then((res) => {
        console.log('deleteperson_C', res);
        if (res) {
            return { id: parseInt(input.Id) };
        }
    })
}

const deletejob_C = input => {
    let Id = parseInt(input.Id);
    return model.job.update({ isDeleted: '1' }, {
        where: { id: Id }
    }).then(async function (res, err) {
        if (res) {
            return { id: parseInt(input.Id) };
        }
    })
}

module.exports = {
    loginUser_C,
    updateUser_C,
    changePassword_C,
    joblist_C,
    personlist_C,
    deleteperson_C,
    deletejob_C
};