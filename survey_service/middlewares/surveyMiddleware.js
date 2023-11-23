const axios = require("axios"); 

const validateToken = async (req, res, next) => { 
    const token =  req.headers.authorization.split(" ")[1]; 
    if(!token) return res.status(401).json({ success: false, msg: "Unauthorized" });

    try { 
        const response = await axios.post("http://localhost:3001/api/v1/auth/validateToken", { token: token });
        if(!response.data.success) return res.status(401).json({ success: false, msg: "Unauthorized" });
        req.userId = response.data.userId;
        next();
    } catch (error) { 
        res.status(500).json({ success: false, msg: "Internal server error" });
    }

} 

module.exports = { validateToken };