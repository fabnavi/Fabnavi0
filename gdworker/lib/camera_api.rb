class CameraAPI
  def initialize
    puts "Initilized"
  end

  def generateQuery op
    return "POST /sony/camera HTTP/1.1\r\nContent-Length: "+ op.length.to_s+ "\r\n\r\n" + op
  end

  def takePicture
    op = "{\"method\":\"actTakePicture\",\"params\":[],\"id\":10,\"version\":\"1.0\"}"
    return generateQuery op
  end
end

