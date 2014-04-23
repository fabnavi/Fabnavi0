class CameraAPI
  def initialize
    puts "Initilized"
  end

  def generateQuery op
    return "POST /sony/camera HTTP/1.1\r\nContent-Length: "+ op.length.to_s+ "\r\n\r\n" + op
  end

  def generateOp (type,params)
    if params == "[\"true\"]" then 
      params = "[true]" 
    end

    if params == "[\"false\"]" then 
      params = "[false]" 
    end
    op = "{\"method\":\""+type+"\",\"params\":"+params.to_s+",\"id\":10,\"version\":\"1.0\"}"
    return generateQuery op
  end

  def fire query
    puts "***** Query: " + query
    s = TCPSocket.open($host, $port)
    s.print(query);
    s.flush
    body = s.read.split(/\r\n\r\n/)[1]
    s.close
    puts "***** Result: " + body
    JSON.parse(body)
  end

end

