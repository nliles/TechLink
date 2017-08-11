class JobsController < ApplicationController
  before_action :set_job, only: [:show, :edit, :update, :destroy]

  def index
    @jobs = Job.all
  end

  # POST /jobs
  # POST /jobs.json
  # def create
  #   @job = Job.new(job_params)
  #   binding.pry
  #   respond_to do |format|
  #     if @job.save
  #       format.html { redirect_to @job, notice: 'Job was successfully created.' }
  #       format.json { render :show, status: :created, location: @job }
  #     else
  #       format.html { render :new }
  #       format.json { render json: @job.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

    def create
      @job = Job.new(job_params)

      respond_to do |format|
      if @article.save
          format.html { redirect_to @job, notice: 'Job was successfully created.' }
          format.json { render :show, status: :created, location: @job }
      else 
          format.html { render :new }
          format.json { render json: @job.errors, status: :unprocessable_entity }
      end
  end

  # # PATCH/PUT /jobs/1
  # # PATCH/PUT /jobs/1.json
  # def update
  #   respond_to do |format|
  #     if @job.update(job_params)
  #       format.html { redirect_to @job, notice: 'Job was successfully updated.' }
  #       format.json { render :show, status: :ok, location: @job }
  #     else
  #       format.html { render :edit }
  #       format.json { render json: @job.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # # DELETE /jobs/1
  # # DELETE /jobs/1.json
  # def destroy
  #   @job.destroy
  #   respond_to do |format|
  #     format.html { redirect_to jobs_url, notice: 'Job was successfully destroyed.' }
  #     format.json { head :no_content }
  #   end
  # end

  private
    def job_params
      params.require(:job).permit(:position, :company, :location, :description, :salary)
    end
end
