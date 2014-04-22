module Camera
  class Camera
    def generateQuery str
      return "POST /sony/camera HTTP/1.1\r\nContent-Length: "+ op.length+ "\r\n\r\n" + op
    end

    def takePicture()
      op = "{\"method\":\"actTakePicture\",\"params\":[],\"id\":10,\"version\":\"1.0\"}"
      return generateQuery op
    end


  end
end 

