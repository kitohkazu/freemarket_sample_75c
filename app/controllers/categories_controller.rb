class CategoriesController < ApplicationController
  def index
    @parents = Category.where(ancestry: nil)
  end

  def children_category
    @children = Category.find(params[:parentCategory]).children
  end

  def grandchildren_category
    @grandchildren = Category.find(params[:childCategory]).children
  end
end