const User = require('../Model/userModel')

const viewUser = async (req, res) => {
    try {
        const result = await User.find()
        res.render('userInfo/Users', {
            title: 'userpage',
            data: result
        })
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

const addUserData = (req, res) => {
    res.render('userInfo/addUsers', {
        title: "addUserData"
    })
}
const createUserData = (req, res) => {
    console.log(req.body);
    const UserData = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        address: {
            street: req.body.street,
            suite: req.body.suite,
            city: req.body.city,
            zipcode: req.body.zipcode,
            geo: {
                lat: req.body.lat,
                lng: req.body.lng,
            }
        },
        phone: req.body.phone
    })

    UserData.save().then((data) => {
        console.log(data, 'data has been added successfully');
        res.redirect('/users')
    }).catch((error) => {
        console.log(error);
        res.redirect('/addUsers')
    })
}

const edit = (req, res) => {
    const id = req.params.id
    User.findById(id).then(data => {
        console.log(data)
        res.render('crud/Edit', {
            title: "edit-page",
            singledata: data
        })
    }).catch(err => {
        console.log(err)
    })

}
const updateData = (req, res) => {

    // console.log(image);
    const id = req.body.s_id
    const name = req.body.name
    const email = req.body.email
    const city = req.body.city
    const phone = req.body.phone
    User.findById(id).then((result) => {
        result.name = name
        result.email = email
        result.city = city
        result.phone = phone

        return result.save().then(results => {
            res.redirect('/users')
            console.log(results, "update successfully")
        })
    }).catch(err => {
        console.log(err, "update failed-")
    })


}

const deleteData = (req, res) => {

    const id = req.params.id
    // Student.deleteOne({_id:id}).then(del=>{
    //     res.redirect('/users')
    // }).catch((err)=>{
    //     console.log(err,"delete failed")
    // })

    User.findByIdAndUpdate({ _id: id }, { status: 0 }).then(del => {
        res.redirect('/users')
    }).catch(err => {
        console.log(err, "delete failed")
    })
}

module.exports = {
    viewUser, addUserData, createUserData, edit, updateData, deleteData
}