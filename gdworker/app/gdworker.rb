require 'resque'

module GDWorker
  @queue = :default
  
  def self.perform(params)
    #clipping with gd
    puts "Clop success!!"
  end
end
