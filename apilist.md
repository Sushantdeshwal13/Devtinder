# Devtinder apis
authrouter
Post /signup
post /login
post /logout

# profilerouter
get /profile/view
patch /profile/edit
patch /profile/password

# connectionrequestrouter
post /request/send/interested/:userid
post /request/send/ignored/:userid
post /request/reviews/accepted/:requestid
post /request/review/rejected/:requestid

# userrouter
get user/connections
get /user/requests/recieved
get /user/feed - gets you the profiles of other users on platform


status: ignore, interested, accepted, rejected
