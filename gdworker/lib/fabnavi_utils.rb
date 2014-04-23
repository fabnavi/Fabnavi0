module Fabnavi
  DATADIR = "/Users/hrl7/src/moz/fabnavi/gdworker/public/data/" 

  def save_pict url, id
    fileName = File.basename(url)
    dirName = DATADIR + id + "/original/"
    filePath = dirName + fileName
    FileUtils.mkdir_p(dirName) unless FileTest.exist?(dirName)
    open(filePath, 'wb') do |output|
      open(url) do |data|
        output.write(data.read)
      end
    end
  end
end
