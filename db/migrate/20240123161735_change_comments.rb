class ChangeComments < ActiveRecord::Migration[7.0]
  def change
    rename_column :comments, :comment, :commentbody
  end
end
