let user;

$.ajax({
    url: "/user/userSession",
    type: 'GET'
}).done(data => {
    if(data.user)
        user = data.user;
});
