require 'aws-sdk-s3'
# helpers for aws s3
module S3Helper
  # Creates a bucket in Amazon S3.
  # @param s3_client [Aws::S3::Client] An initialized Amazon S3 client.
  # @param bucket_name [String] The name of the bucket.
  # @return [Boolean] true if the bucket was created; otherwise, false.
  # @example
  #   exit 1 unless bucket_created?(
  #     Aws::S3::Client.new(region: 'us-east-1'),
  #     'doc-example-bucket'
  #   )
  def bucket_created?(s3_client, bucket_name)
    response = s3_client.create_bucket(bucket: bucket_name)
    response.location == "/#{bucket_name}"
  rescue StandardError => e
    puts "Error creating bucket: #{e.message}"
    false
  end

  # Checks to see whether an (Amazon S3) bucket exists.
  # @param s3_client [Aws::S3::Client] An initialized S3 client.
  # @param bucket_name [String] The name of the bucket.
  # @return [Boolean] true if the bucket exists; otherwise, false.
  # @example
  #   exit 1 unless bucket_exists?(
  #     Aws::S3::Client.new(region: 'us-east-1'),
  #     'doc-example-bucket'
  #   )
  def bucket_exists?(s3_client, bucket_name)
    response = s3_client.list_buckets
    response.buckets.each do |bucket|
      return true if bucket.name == bucket_name
    end
    false
  rescue StandardError => e
    puts "Error listing buckets: #{e.message}"
    false
  end

  # Deletes the objects in an Amazon S3 bucket and deletes the bucket.
  #
  # @param bucket [Aws::S3::Bucket] The bucket to empty and delete.
  def delete_bucket(bucket)
    puts("\nDo you want to delete all of the objects as well as the bucket (y/n)? ")
    answer = gets.chomp.downcase
    if answer == "y"
      bucket.objects.batch_delete!
      bucket.delete
      puts("Emptied and deleted bucket #{bucket.name}.\n")
    end
  rescue Aws::Errors::ServiceError => e
    puts("Couldn't empty and delete bucket #{bucket.name}.")
    puts("\t#{e.code}: #{e.message}")
    raise
  end

  # Lists the available Amazon S3 buckets.
  # @param s3_client [Aws::S3::Client] An initialized Amazon S3 client.
  # @example
  #   list_buckets(Aws::S3::Client.new(region: 'us-east-1'))
  def list_buckets(s3_client)
    response = s3_client.list_buckets
    if response.buckets.count.zero?
      puts 'No buckets.'
    else
      response.buckets.each do |bucket|
        puts bucket.name
      end
    end
  rescue StandardError => e
    puts "Error listing buckets: #{e.message}"
  end

  # Lists the objects in an Amazon Simple Storage Service (Amazon S3) bucket.
  # - An S3 bucket, preferably containing at least one object.
  # @param s3_client [Aws::S3::Client] An initialized S3 client.
  # @param bucket_name [String] The name of the bucket.
  # @param max_objects [Integer] The maximum number of objects to list. The
  #   number must be between 1 and 1,000. If not specified, only up to the
  #   first 50 objects will be listed.
  # @example
  #   list_bucket_objects(
  #     Aws::S3::Client.new(region: 'us-east-1'),
  #     'doc-example-bucket',
  #     100
  #   )
  def list_bucket_objects(s3_client, bucket_name, max_objects = 50)
    if max_objects < 1 || max_objects > 1000
      puts 'Maximum number of objects to request must be between 1 and 1,000.'
      return
    end

    objects = s3_client.list_objects_v2(
      bucket: bucket_name,
      max_keys: max_objects
    ).contents

    if objects.count.zero?
      puts "No objects in bucket '#{bucket_name}'."
      return
    else
      if objects.count == max_objects
        puts "First #{objects.count} objects in bucket '#{bucket_name}':"
      else
        puts "Objects in bucket '#{bucket_name}':"
      end
      objects.each do |object|
        puts object.key
      end
    end
  rescue StandardError => e
    puts "Error accessing bucket '#{bucket_name}' " \
    "or listing its objects: #{e.message}"
  end

  # Lists available objects in an Amazon S3 bucket.
  # @param s3_client [Aws::S3::Client] An initialized Amazon S3 client.
  # @param bucket_name [String] The name of the bucket.
  # @example
  #   list_objects(
  #     Aws::S3::Client.new(region: 'us-east-1'),
  #     'doc-example-bucket'
  #   )
  def list_objects(s3_client, bucket_name)
    response = s3_client.list_objects_v2(bucket: bucket_name)
    if response.contents.count.zero?
      puts 'No objects.'
    else
      response.contents.each do |object|
        puts object.key
      end
    end
  rescue StandardError => e
    puts "Error listing objects: #{e.message}"
  end

  # Copies an object from one Amazon S3 bucket to another.
  # @param s3_client [Aws::S3::Client] An initialized Amazon S3 client.
  # @param source_bucket_name [String] The name of the source bucket.
  # @param source_object_key [String] The name of the object to copy.
  # @param target_bucket_name [String] The name of the target bucket.
  # @param target_object_key [String] The name of the copied object.
  # @return [Boolean] true if the object was copied; otherwise, false.
  # @example
  #   exit 1 unless object_copied?(
  #     Aws::S3::Client.new(region: 'us-east-1'),
  #     'doc-example-bucket',
  #     'my-file.txt',
  #     'doc-example-bucket1',
  #     'my-file-1.txt'
  #   )
  def object_copied?(
    s3_client,
    source_bucket_name,
    source_object_key,
    target_bucket_name,
    target_object_key
  )
    response = s3_client.copy_object(
      bucket: target_bucket_name,
      copy_source: "#{source_bucket_name}/#{source_object_key}",
      key: target_object_key
    )
    response.copy_object_result.etag ? true : false
  rescue StandardError => e
    puts "Error copying object: #{e.message}"
    false
  end

  # Deletes an object from an Amazon S3 bucket.
  # - An object to be deleted from the bucket.
  # @param s3_client [Aws::S3::Client] An initialized Amazon S3 client.
  # @param bucket_name [String] The name of the bucket.
  # @return object_key [String] The name of the object.
  # @example
  #   exit 1 unless object_deleted?(
  #     Aws::S3::Client.new(region: 'us-east-1'),
  #     'doc-example-bucket',
  #     'my-file.txt'
  #   )
  def object_deleted?(s3_client, bucket_name, object_key)
    response = s3_client.delete_objects(
      bucket: bucket_name,
      delete: {
        objects: [{ key: object_key }]
      }
    )
    response.deleted.count == 1
  rescue StandardError => e
    puts "Error deleting object: #{e.message}"
    false
  end

  # Downloads an object from an Amazon Simple Storage Service (Amazon S3) bucket.
  # @param s3_client [Aws::S3::Client] An initialized S3 client.
  # @param bucket_name [String] The name of the bucket containing the object.
  # @param object_key [String] The name of the object to download.
  # @param local_path [String] The path on your local computer to download
  #   the object.
  # @return [Boolean] true if the object was downloaded; otherwise, false.
  # @example
  #   exit 1 unless object_downloaded?(
  #     Aws::S3::Client.new(region: 'us-east-1'),
  #     'doc-example-bucket',
  #     'my-file.txt',
  #     './my-file.txt'
  #   )
  def object_downloaded?(s3_client, bucket_name, object_key, local_path)
    s3_client.get_object(
      response_target: local_path,
      bucket: bucket_name,
      key: object_key
    )
  rescue StandardError => e
    puts "Error getting object: #{e.message}"
  end

  # Uploads an object to a bucket in # - An Amazon S3 bucket.
  # @param s3_client [Aws::S3::Client] An initialized Amazon S3 client.
  # @param bucket_name [String] The name of the bucket.
  # @param object_key [String] The name of the object.
  # @param object_content [String] The content to add to the object.
  # @return [Boolean] true if the object was uploaded; otherwise, false.
  # @example
  #   exit 1 unless object_uploaded?(
  #     Aws::S3::Client.new(region: 'us-east-1'),
  #     'doc-example-bucket',
  #     'my-file.txt',
  #     'This is the content of my-file.txt.'
  #   )
  def object_uploaded?(s3_client, bucket_name, object_key, object_content)
    response = s3_client.put_object(
      bucket: bucket_name,
      key: object_key,
      body: object_content
    )
    response.etag ? true : false
  rescue StandardError => e
    puts "Error uploading object: #{e.message}"
    false
  end
end
