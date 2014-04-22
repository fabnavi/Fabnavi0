Gdworker::App.controllers :camera do

  get '/' do
  end



  get '/takepicture' do
    s = TCPSocket.open($host, $port)
    query = Camera.takePicture()
    s.print(query);
    s.flush
    body = s.read.split(/\r\n\r\n/)[1]
    @doc = JSON.parse(body)
    @url = @doc['result'][0][0]
    puts open(@url)
    s.close
    render 'log'
  end
  # get :index, :map => '/foo/bar' do
  #   session[:foo] = 'bar'
  #   render 'index'
  # end

  # get :sample, :map => '/sample/url', :provides => [:any, :js] do
  #   case content_type
  #     when :js then ...
  #     else ...
  # end

  # get :foo, :with => :id do
  #   'Maps to url '/foo/#{params[:id]}''
  # end

  # get '/example' do
  #   'Hello world!'
  # end


end
