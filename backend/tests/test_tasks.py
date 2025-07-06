from datetime import datetime, timedelta


def test_create_task(client, create_project):
    # First create a project and get it's id
    project = create_project()

    # Now create a task
    task_resp = client.post("/tasks/", json={
        "title": "Test Task",
        "description": "Some description",
        "deadline": datetime.now().isoformat(),
        "completed": False,
        "project_id": project["id"]
    })
    # Check if task was created
    assert task_resp.status_code == 200
    task = task_resp.json()
    assert task["title"] == "Test Task"
    assert task["project_id"] == project["id"]


def test_create_task_without_project(client):
    # Try to create a task without a project
    task_resp = client.post("/tasks/", json={
        "title": "Test Task",
        "description": "Some description",
        "deadline": datetime.now().isoformat(),
        "completed": False
    })
    assert task_resp.status_code == 422


def test_create_task_without_deadline(client, create_project):
    # First create a project and get it's id
    project = create_project()

    # Now try to create a task without deadline
    task_resp = client.post("/tasks/", json={
        "title": "Test Task",
        "description": "Some description",
        "completed": False,
        "project_id": project["id"]
    })
    assert task_resp.status_code == 200


def test_create_task_deadline_after_project_deadline(client, create_project):
    # First create a project and get it's id
    project = create_project()

    # Now try to create a task with deadline after project deadline
    task_resp = client.post("/tasks/", json={
        "title": "Test Task",
        "description": "Some description",
        "deadline": (datetime.now() + timedelta(days=40)).isoformat(),
        "completed": False,
        "project_id": project['id']
    })
    assert task_resp.status_code == 400


def test_get_tasks(client, create_task):
    # First create a task
    create_task()
    # Then try to download tasks
    response = client.get("/tasks/")
    assert response.status_code == 200
    # If response was 200 then check data length and type
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1


def test_get_single_task(client, create_task):
    # First create a task
    task = create_task()
    # Then try to download it
    response = client.get(f"/tasks/{task['id']}")
    assert response.status_code == 200
    assert response.json()["id"] == task["id"]


def test_get_tasks_with_deadlines(client, create_task):
    # First create a task and a task with deadline
    create_task()
    create_task(deadline=datetime.now().isoformat())
    # Download tasks with deadlines
    response = client.get("/tasks/deadlines")
    assert response.status_code == 200
    # If response was 200 then check data length and type
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 1


def test_get_nonexistent_task(client):
    # Try to get a task that does not exist
    response = client.get("/tasks/9999")
    assert response.status_code == 404


def test_update_task(client, create_task):
    # First create a task
    task = create_task()
    # Change description of the created task and see if it worked
    new_desc = 'Changed description'
    task['description'] = new_desc
    task_resp = client.put(f'/tasks/{task['id']}', json=task)
    assert task_resp.status_code == 200
    assert task_resp.json()['description'] == new_desc


def test_task_update_nonexistent_task(client, create_project):
    # Create a valid project id for the payload
    project = create_project()
    # Try to update a task that does not exist
    task_resp = client.put('/tasks/9999', json={
        "title": "Test Task",
        "description": "Some description",
        "deadline": datetime.now().isoformat(),
        "completed": False,
        "project_id": project['id']
    })
    assert task_resp.status_code == 404


def test_task_update_deadline_after_project_deadline(client, create_project, create_task):
    # First create a task
    task = create_task()
    # Now try to update the task
    task_resp = client.put(f'/tasks/{task['id']}', json={
        "title": "Test Task",
        "description": "Some description",
        "deadline": (datetime.now() + timedelta(days=40)).isoformat(),
        "completed": False,
        "project_id": task['project_id']
    })
    assert task_resp.status_code == 400


def test_delete_task(client, create_task):
    # First create a task
    task = create_task()
    # Try to delete it and see if it worked
    task_resp = client.delete(f'/tasks/{task['id']}')
    assert task_resp.status_code == 200


def test_delete_nonexistent_task(client):
    # Try to delete a task that does not exist
    task_resp = client.delete('/tasks/9999')
    assert task_resp.status_code == 404