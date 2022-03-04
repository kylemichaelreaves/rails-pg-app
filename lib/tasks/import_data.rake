namespace :active_jobs do
    desc "imports data from sql to postgresql"
    task :import => :environment do
        ImportDataJob.perform_later
    end
 end