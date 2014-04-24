Gdworker::App.controllers :project do

  get "/getList" do 
    res = []
    Dir.chdir(Fabnavi::DATADIR)
    Dir.glob('*').each do |t|
      Dir.chdir(t)
      picts = Dir.glob('*.{jpg,JPG}')  
      res.push({:id=>t,:thumbnail=>("data/"+t+"/"+picts[0].to_s)})
      Dir.chdir("../")
    end
    res.to_json
  end

  get "/getProject" do 
    id = params[:project_id]
    res = []
    Dir.chdir(Fabnavi::DATADIR + id)
    Dir.glob('*.{jpg,JPG}').each do |t|
      res.push({:id=>t,:thumbnail=>("data/original/"+id+"/"+t)})
    end
    res.to_json
  end

  get "/new" do
    if params[:projectName] == nil then
      id = Time.now.nsec.to_s
    else 
      id = params[:projectName].to_s
    end
    Dir.chdir(Fabnavi::DATADIR)
    Dir.mkdir id
    Dir.chdir(id)
    Dir.mkdir "original"
    Dir.mkdir "note"
    FileUtils.touch "fabnavi.play.config"
    backup_config id

    return {:id=>id}.to_json 
  end

  get "/takePicture" do
    id = params[:project_id]
    api = CameraAPI.new 
    query = api.generateOp("actTakePicture",[])
    doc = api.fire query
    url = doc['result'][0][0]
    save_pict url, id
    fileName = File.basename(/^http.*.JPG/.match(url)[0])
    puts fileName
    puts "********************"
    return {:url=>"data/"+id+"/original/"+fileName}.to_json
  end

  post "/postConfig" do
    id = params[:project_id]
    data = params[:data]
    puts data
    backup_config id
    save_config id,data
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
