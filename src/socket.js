

module.exports=(io)=>{
    var data = []
    var users=0
    io.on('connection',(socket)=>{
        for (let index = 0; index < data.length; index++) {
            
            io.emit('show_drawing', data[index])
        }

        users= users+1
        io.emit('users',users)

        socket.on('delete',()=>{
            data =[]
            io.emit('show_drawing',null)
        })
        socket.on('drawing',(drawing)=>{
            data.push(drawing)
            io.emit('show_drawing', drawing)
        })

        socket.on('disconnect',()=>{
            users= users-1
            io.emit('users',users)
        })
    })
}
