class CreateJobs < ActiveRecord::Migration[5.1]
  def change
    create_table :jobs do |t|
      t.string :position
      t.string :company
      t.string :location
      t.integer :lat 
      t.integer :lng
      t.string :description
      t.string :salary
      t.references :user

      t.timestamps
    end
  end
end
