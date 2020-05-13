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
    console.log('input', input);
    return model.job.findAndCountAll({
        where: { locationID: input.locationId, isDeleted: '0' },
        order: [['id', 'DESC']],
        limit: parseInt(input.limit),
        offset: parseInt(input.offset),
        distinct: true,
        include: [
            { model: model.location, attributes: ['name'] },
            { model: model.jobphone, attributes: ['id', 'phoneType', 'phone'] },
            { model: model.jobemail, attributes: ['id', 'emailType', 'email'] },
            { model: model.assigncontactlist, attributes: ['id'], include: [{ model: model.personlist, attributes: ['id', 'name', 'address', 'email', 'contactNumber', 'company'] }] },
            {
                model: model.assignfilelist, attributes: ['id'],
                include: [{
                    model: model.jobfile, attributes: ['id', 'clientId', 'quantity', 'Commodity', 'filestatus', 'fileNo'],
                    include: [{ model: model.client, attributes: ['id', 'name'] }, { model: model.assignmanagetofile, attributes: ['id'], include: [{ model: model.accountmanager, attributes: ['id', 'managername'] }] }]
                }]
            }
        ]
    }).then((res) => {
        if (res) {
            //console.log('3333', res);
            res.rows[0]['count'] = res.count;
            //console.log('3333', res.rows);
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
        //console.log('deleteperson_C', res);
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
const updateJob_C = input => {
    console.log('updateJob_C', input);
    let jobId = parseInt(input.input.Id);
    let jobdata = input.input;
    let jobemailarry = input.input.jobemails;
    let jobphonearry = input.input.jobphones;
    delete jobdata.jobemails
    delete jobdata.jobphones
    console.log(jobdata, jobemailarry);
    return model.job.update(jobdata, { where: { id: jobId } }).then(async function (datajob, err) {
        await model.jobphone.destroy({ where: { jobId: jobId } })
        await model.jobemail.destroy({ where: { jobId: jobId } })

        for (let i in jobemailarry) {
            jobemailarry[i]['jobId'] = jobId;
        }

        for (let i in jobphonearry) {
            jobphonearry[i]['jobId'] = jobId;
        }
        //console.log("obdata333", jobemailarry);
        await model.jobphone.bulkCreate(jobphonearry);
        await model.jobemail.bulkCreate(jobemailarry);

        return { id: parseInt(input.input.Id) };
    })
}

const clientlist_C = input => {
    return model.client.findAll().then((res) => {
        if (res) {
            console.log('7777', res);
            return res;
        }

    })
}
const managerlist_C = input => {
    return model.accountmanager.findAll().then((res) => {
        if (res) {
            for (let i in res) {
                res[i].accountmanager = res[i];
            }
            return res;
        }

    })
}

const updatefile_C = input => {
    console.log('file update333', input);
    let fileId = parseInt(input.input.Id);
    let filedata = input.input;
    let assignobject = input.input.assignmanage
    let assignarry = [];

    console.log(assignobject[0])
    delete filedata.assignmanage
    return model.jobfile.update(filedata, { where: { id: fileId } }).then(async function (datajob, err) {
        await model.assignmanagetofile.destroy({ where: { fileId: fileId } })

        for (let i = 0; i < Object.keys(assignobject).length; i++) {
            assignobject[i]['fileId'] = fileId;
            assignarry.push({ 'fileId': fileId, 'managerId': assignobject[i] })
        }
        await model.assignmanagetofile.bulkCreate(assignarry);

        return { id: parseInt(input.input.Id) };
    })
}


const deletefile_C = input => {
    let jobId = parseInt(input.jobId);
    let fileId = parseInt(input.fileId);
    return model.assignfilelist.destroy({
        where: {
            jobId: jobId,
            fileId: fileId
        }
    }).then((res) => {
        //console.log('deleteperson_C', res);
        if (res) {
            return { id: parseInt(input.fileId) };
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
    deletejob_C,
    updateJob_C,
    clientlist_C,
    managerlist_C,
    updatefile_C,
    deletefile_C
};