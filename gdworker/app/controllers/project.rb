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
    res = []
    Dir.chdir(Fabnavi::DATADIR + params[:project_id])
    Dir.glob('*.{jpg,JPG}').each do |t|
      res.push({:id=>t,:thumbnail=>("data/original/"+params[:project_id]+"/"+t)})
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
    api = CameraAPI.new 
    query = api.generateOp("actTakePicture",[])
    doc = api.fire query
    url = doc['result'][0][0]
    save_pict url,params[:project_id]
    return {:url=>Fabnavi::DATADIR+params[:project_id]+"/original/"+File.basename(url)}
  end

  post "/postConfig" do
    puts params
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
