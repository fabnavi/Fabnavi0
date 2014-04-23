Gdworker::App.controllers :project do

  get "/getList" do 
    res = []
    Dir.chdir(Dir.home+"/src/moz/fabnavi/gdworker/public/data")
    Dir.glob('*').each do |t|
      Dir.chdir(t)
      picts = Dir.glob('*.{jpg,JPG}')  
      res.push({:id=>t,:thumbnail=>("data/"+t+"/"+picts[0].to_s)})
      Dir.chdir("../")
    end
    res.to_json
  end

  get "/new" do
    if params[:projectName] == nil then
      id = Time.now.nsec.to_s
    else 
      id = params[:projectName].to_s
    end
    Dir.chdir(Dir.home+"/src/moz/fabnavi/gdworker/public/data")
    Dir.mkdir id
    Dir.chdir(id)
    Dir.mkdir "original"
    Dir.mkdir "note"
    FileUtils.touch "fabnavi.play.config"

    return {:id=>id}.to_json 
  end

  get "/takePicture" do
    api = CameraAPI.new 
    query = api.generateOp("actTakePicture")
    api.fire query
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
