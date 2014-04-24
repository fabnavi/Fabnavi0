module Fabnavi
  DATADIR = "/Users/hrl7/src/moz/fabnavi/gdworker/public/data/" 

  def save_pict url, id
    fileName =File.basename(/^http.*.JPG/.match(url)[0])
    filePath = DATADIR+id+"/original/"+ fileName
    open(filePath, 'wb') do |output|
      open(url) do |data| 
        output.write(data.read)
      end
    end
  end

  def save_config id ,data
    fileName = "fabnavi.play.config"
    dirName = DATADIR + id + "/"
    filePath = dirName + fileName
    open(filePath, 'w') do |output|
      output.write(data)
    end
  end

  def backup_config id
    dirName = DATADIR + id  + "/"
    FileUtils.copy_file(dirName+"fabnavi.play.config",dirName+Time.now.utc.to_s+".config")
  end
end
